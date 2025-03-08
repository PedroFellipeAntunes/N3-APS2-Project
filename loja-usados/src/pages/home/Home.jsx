import { useState, useEffect } from 'react';

import { getOffers } from '../../services/api';

import { Header } from '../../components/header';
import { Banner } from '../../components/banner';
import { Footer } from '../../components/footer';

import { SellCard } from '../../components/card/sell_card';
import { BuyCard } from '../../components/card/buy_card';

import './index.css';

export default function Home() {
    const [sellOffers, setSellOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [activeTab, setActiveTab] = useState("sell"); // 'sell' ou 'buy'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAllOffers() {
            setLoading(true);
            try {
                const allOffers = await getOffers();

                // Separar as ofertas com base no atributo "type"
                const sell = allOffers.filter(offer => offer.type === "sell");
                const buy = allOffers.filter(offer => offer.type === "buy");

                setSellOffers(sell);
                setBuyOffers(buy);
            } catch (error) {
                console.error("Erro ao carregar ofertas:", error);
            } finally {
                setLoading(false);
            }
        }

        loadAllOffers();
    }, []);

    return (
        <>
            <Header />
            <Banner />
            <main className='home_main'>
                {/* Botões para alternar entre ofertas de venda e compra */}
                <div className='tab-buttons'>
                    <button 
                        className={activeTab === "sell" ? "active" : ""}
                        onClick={() => setActiveTab("sell")}
                    >
                        Ofertas de Venda
                    </button>
                    <button 
                        className={activeTab === "buy" ? "active" : ""}
                        onClick={() => setActiveTab("buy")}
                    >
                        Ofertas de Compra
                    </button>
                </div>

                {/* Exibição condicional dos grupos */}
                {activeTab === "sell" && (
                    <div className='group'>
                        {loading ? (
                            <div className='empty-search'>
                                <h1>Carregando...</h1>
                            </div>
                        ) : sellOffers.length > 0 ? (
                            sellOffers.map((sellOffer) => (
                                <SellCard key={sellOffer._id} offer={sellOffer} />
                            ))
                        ) : (
                            <div className='empty-search'>
                                <h1>Não há ofertas de venda disponíveis.</h1>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "buy" && (
                    <div className='group'>
                        {loading ? (
                            <div className='empty-search'>
                                <h1>Carregando...</h1>
                            </div>
                        ) : buyOffers.length > 0 ? (
                            buyOffers.map((buyOffer) => (
                                <BuyCard key={buyOffer._id} offer={buyOffer} />
                            ))
                        ) : (
                            <div className='empty-search'>
                                <h1>Não há ofertas de compra disponíveis.</h1>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
