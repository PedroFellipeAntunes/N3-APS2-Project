import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getOffer, getOffersByUser, updateOffer, getOffersWithFilters } from "../../services/api";
import "./buy_info.css";

import { OfferModal } from "../auction";

import { useCallback } from "react";
import { SellCard } from '../../components/card/sell_card';

export function BuyInfo({ offer }) {
  if (!offer) {
    return <p>Carregando...</p>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem("user");

      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
        }
      }
    }

    loadUserData();
  }, []);

  const [auctionOffers, setAuctionOffers] = useState([]);

  //Estado para armazenar isOwner
  //Considerar que começa como owner para esconder o botão
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (user && offer) {
      setIsOwner(user._id === offer.user_id);
    }
  }, [user, offer]);

  //Estado para verificar se o usuário já fez uma oferta
  const [hasOfferInAuction, setHasOfferInAuction] = useState(false);
  // Novo estado para armazenar o ID da oferta correspondente
  const [matchedOfferId, setMatchedOfferId] = useState(null);
  useEffect(() => {
    async function getOffersFromUser() {
      if (!user || !user._id) {
        alert("Necessario fazer LOGIN");
        return;
      }
  
      try {
        const userOffers = await getOffersByUser(user._id);
        
        // console.log("Ofertas do usuário:", userOffers.map(o => o._id));
        // console.log("IDs no auction:", offer.auction);
  
        // Verifica se o usuário já fez uma oferta no leilão
        const matchingOffer = userOffers.find(userOffer =>
          offer.auction.includes(userOffer._id)
        );
  
        if (matchingOffer) {
          setMatchedOfferId(matchingOffer._id); // Armazena o ID da oferta correspondente
          setHasOfferInAuction(true);
          console.log("Usuário já tem uma oferta neste leilão.");
        } else {
          setMatchedOfferId(null);
          setHasOfferInAuction(false);
          console.log("Usuário NÃO tem oferta neste leilão.");
        }
      } catch (error) {
        console.error("Erro ao buscar ofertas do usuário:", error);
      }
    }
  
    if (user && !isOwner) {
      getOffersFromUser();
    }
  }, [user, offer, isOwner]);  

  // Busca as ofertas do leilão quando o usuário for o dono da oferta
  useEffect(() => {
    async function loadAuctionOffers() {
      if (isOwner && offer.auction && offer.auction.length > 0) {
        try {
          // Filtro para buscar todas as ofertas com base nos IDs presentes em offer.auction
          const filter = { _id: offer.auction };
          const fetchedOffers = await getOffersWithFilters(filter);
          // console.log(await getOffer(offer.auction[0]));
          console.log(fetchedOffers);
          setAuctionOffers(fetchedOffers);
        } catch (error) {
          console.error("Erro ao carregar ofertas do leilão:", error);
        }
      }
    }
  
    loadAuctionOffers();
  }, [isOwner, offer.auction]);  // Atualiza sempre que offer.auction mudar  

  async function removeOfferFromAuction() {
    if (!user || !user._id || !matchedOfferId) {
      console.log("Não tem usuário, id ou oferta correspondente");
      return;
    }

    try {
      // Filtra o auction removendo a oferta do usuário
      const updatedAuction = offer.auction.filter(auctionOfferId => auctionOfferId !== matchedOfferId);

      // Atualiza o estado da oferta (simulação de atualização na API)
      offer.auction = updatedAuction;
      console.log(offer.auction);
      // Agora vamos chamar o backend para atualizar a oferta
      await updateOffer(offer._id, offer);
      
      setHasOfferInAuction(false);
      setMatchedOfferId(null);  // Limpa o ID da oferta correspondente

      alert("Oferta removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover oferta do leilão:", error);
    }
  }

  const formattedPrice = parseFloat(offer.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Função que abre o modal apenas se o usuário estiver logado
  // Substitua as definições inline por funções memoizadas:
  const handleOfferButtonClick = useCallback(() => {
    if (!user) {
      alert("Você precisa estar logado para fazer uma oferta!");
      return;
    }
    setIsModalOpen(true);
  }, [user]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="buy-info">
      <div className="top-area">
        <div className="buy-basic-info">
          <div className="basic-info-text">
            <h1 className="product-name">{offer.product.name}</h1>
            <h2>Valor máximo: {formattedPrice}</h2>
          </div>
          {!isOwner && (
            <div className="btn-div">
              {!hasOfferInAuction ? (
                <button className="auction" onClick={handleOfferButtonClick}>
                  Oferecer Produto
                </button>
              ) : (
                <button className="remove-auction" onClick={removeOfferFromAuction}>Remover Oferta</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bottom-area">
        <section>
          <h2>Detalhes do Produto</h2>
          <p><strong>Marca:</strong> {offer.product.brand}</p>
          <p><strong>Fabricante:</strong> {offer.product.manufacturer}</p>
          <p><strong>Categoria:</strong> {offer.product.category}</p>
          <p><strong>Condição:</strong> {offer.product.usage_categories.join(", ")}</p>
          <p><strong>Tempo máximo de uso:</strong> {offer.product.max_usage_time_months} meses</p>
          {offer.product.usage_type?.length > 0 && (
            <>
              <p><strong>Tipo de Uso:</strong></p>
              <ul>
                {offer.product.usage_type.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </>
          )}
          <p><strong>Overclock:</strong> {offer.product.overclocked ? "Sim" : "Não"}</p>
          <p><strong>Reparado:</strong> {offer.product.repaired ? "Sim" : "Não"}</p>
          {offer.product.warranty?.available && (
            <p><strong>Garantia mínima até:</strong> {offer.product.warranty.min_valid_until}</p>
          )}
        </section>

        {offer.retrival && (
          <section>
            <h2>Forma de Recebimento</h2>
            <p>{offer.retrival.in_person ? "✅ Retirada em mãos" : "❌ Sem retirada em mãos"}</p>
            <p>{offer.retrival.shipping ? "✅ Envio disponível" : "❌ Sem envio"}</p>
          </section>
        )}

        <section>
          <h2>Localização</h2>
          <p>{offer.location.city}, {offer.location.state}</p>
        </section>

        <section>
          <h2>Descrição de Oferta</h2>
          <p className="offer-desc">{offer.product.description}</p>
        </section>
      </div>

      {/* Se user for dono deve poder visualizar uma lista de ofertas no auction */}
      {isOwner && (
        <>
        <h2>Ofertas:</h2>
        <section className="auction-offers">
          <div className="group">
            {auctionOffers?.length > 0 ? (
              auctionOffers.map((auction) => (
                  <SellCard key={auction._id} offer={auction} />
              ))
            ) : (
              <div className="empty-search">
                  <h1>Não há ofertas.</h1>
              </div>
            )}
          </div>
        </section>
        </>
      )}

      {/* Modal de oferta */}
      <OfferModal 
        setHasOfferInAuction={setHasOfferInAuction} 
        setMatchedOfferId={setMatchedOfferId} 
        user={user} 
        offer={offer} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
