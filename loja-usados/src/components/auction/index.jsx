import { useState, useEffect } from "react";
import "./index.css";
import { getOffersByUser } from '../../services/api';
import { AuctionCard } from '../../components/card/auction_card';

import { updateOffer } from '../../services/api';

export function OfferModal({setHasOfferInAuction, setMatchedOfferId, user, offer, isOpen, onClose }) {
  if (!isOpen) return null;

  const [sellOffers, setSellOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null); // Estado para armazenar a oferta selecionada

  useEffect(() => {
    let isMounted = true;

    async function loadAllOffers() {
      if (!user || !user._id) return;

      setLoading(true);
      try {
        const userOffers = await getOffersByUser(user._id);
        const sell = userOffers.filter((offer) => offer.type === "sell");

        if (isMounted) {
          setSellOffers(sell);
        }
      } catch (error) {
        console.error("Erro ao carregar ofertas:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAllOffers();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Função para selecionar um card
  const handleSelectOffer = (sellOffer) => {
    setSelectedOffer(sellOffer); // Define a oferta selecionada
  };

  // Função para confirmar a oferta e adicionar ao auction da offer atual
  const handleConfirm = async () => {
    if (!selectedOffer) {
      console.warn("Nenhuma oferta foi selecionada!");
      return;
    }
  
    // Adiciona a oferta ao auction da oferta atual
    if (!offer.auction) {
      offer.auction = []; // Garante que auction existe
    }
  
    offer.auction.push(selectedOffer._id);
    console.log("Oferta atual", offer._id);
    console.log(offer.type);
    console.log("Oferta adicionada ao leilão LOCAL:", selectedOffer._id);
  
    try {
      // Chama o backend para atualizar a oferta
      await updateOffer(offer._id, offer);
  
      // Atualiza os estados após a confirmação com sucesso
      setHasOfferInAuction(true);
      setMatchedOfferId(selectedOffer._id); // Define o ID da oferta adicionada

      alert("Oferta adicionada com sucesso!");
  
      // Fecha o modal
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar oferta ao leilão:", error);
    }
  };  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="top">
          <h2>Ofertar Produto</h2>
          <p>Confirme sua oferta para este leilão.</p>
          <section className="auction-offer-selection">
            <div className="group">
              {loading ? (
                <div className="empty-search">
                  <h1>Carregando...</h1>
                </div>
              ) : sellOffers?.length > 0 ? (
                sellOffers.map((sellOffer) => (
                  <AuctionCard
                    key={sellOffer._id}
                    offer={sellOffer}
                    isSelected={selectedOffer?._id === sellOffer._id} // Define se está selecionado
                    onSelect={() => handleSelectOffer(sellOffer)} // Seleciona o card ao clicar
                  />
                ))
              ) : (
                <div className="empty-search">
                  <h1>Não há ofertas de venda disponíveis.</h1>
                </div>
              )}
            </div>
          </section>
        </div>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>Confirmar</button>
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
