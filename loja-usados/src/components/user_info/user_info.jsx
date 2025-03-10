import { useState, useEffect } from "react";
import "./index.css";

import { getOffersByUser, deleteOffer } from '../../services/api';

import { SellCard } from '../../components/card/sell_card';
import { BuyCard } from '../../components/card/buy_card';

export function UserInfo({ user }) {
    const [sellOffers, setSellOffers] = useState(null);
    const [buyOffers, setBuyOffers] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mover a função loadAllOffers para fora do useEffect
    const loadAllOffers = async () => {
        if (!user || !user._id) return; // Só busca se user._id existir

        setLoading(true);
        try {
            const userOffers = await getOffersByUser(user._id);

            if (!userOffers) {
                return;
            }

            const sell = userOffers.filter((offer) => offer.type === "sell");
            const buy = userOffers.filter((offer) => offer.type === "buy");

            setSellOffers(sell);
            setBuyOffers(buy);
        } catch (error) {
            console.error("Erro ao carregar ofertas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllOffers(); // Agora chama a função aqui
    }, [user]); // Agora só roda quando `user` muda

    const handleDelete = async (offerId) => {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esta oferta?");
        if (!confirmDelete) return;
    
        try {
            await deleteOffer(offerId);
            
            // Recarrega as ofertas após a exclusão
            loadAllOffers();  // Chama a função para recarregar as ofertas do servidor
        } catch (error) {
            console.error("Erro ao deletar oferta:", error);
        }
    };    

    return (
        <div className="user-info">
            <div className="top-area">
                <h1>Dados do usuário:</h1>
                <div className="user-data">
                    <h2 className="user-name">{`Nome: ${user?.name}`}</h2>
                    <h2 className="user-email">{`E-Mail: ${user?.email}`}</h2>
                    <h2 className="user-cpf">{`CPF: ${user?.cpf}`}</h2>
                    <h2 className="user-cep">{`CEP: ${user?.cep}`}</h2>
                </div>
            </div>
            <div className="bottom-area">
                <section>
                    <h2 className="title">Ofertas de venda:</h2>
                    <div className="group">
                        {loading ? (
                            <div className="empty-search">
                                <h1>Carregando...</h1>
                            </div>
                        ) : sellOffers?.length > 0 ? (
                            sellOffers.map((sellOffer) => (
                                <div className="user-card-div" key={sellOffer._id}>
                                    <button className="delete-btn" onClick={() => handleDelete(sellOffer._id)}>Deletar</button>
                                    <SellCard offer={sellOffer} />
                                </div>
                            ))
                        ) : (
                            <div className="empty-search">
                                <h1>Não há ofertas de venda disponíveis.</h1>
                            </div>
                        )}
                    </div>
                    <h2 className="title">Ofertas de compra:</h2>
                    <div className="group">
                        {loading ? (
                            <div className="empty-search">
                                <h1>Carregando...</h1>
                            </div>
                        ) : buyOffers?.length > 0 ? (
                            buyOffers.map((buyOffer) => (
                                <div className="user-card-div" key={buyOffer._id}>
                                    <button className="delete-btn" onClick={() => handleDelete(buyOffer._id)}>Deletar</button>
                                    <BuyCard offer={buyOffer} />
                                </div>
                            ))
                        ) : (
                            <div className="empty-search">
                                <h1>Não há ofertas de compra disponíveis.</h1>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
