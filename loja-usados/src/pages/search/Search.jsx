import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getOffersWithFilters } from '../../services/api';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { SellCard } from '../../components/card/sell_card';
import { BuyCard } from '../../components/card/buy_card';
import { SearchBar } from '../../components/lateral_search_bar';

import './index.css';

export default function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const product_name = queryParams.get('product_name') || '';

    const [sellOffers, setSellOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [activeTab, setActiveTab] = useState("sell");
    const [sortOption, setSortOption] = useState("price_asc"); 

    // Atualiza os filtros toda vez que a URL muda
    const [filters, setFilters] = useState({ name: product_name });

    useEffect(() => {
        setFilters({ name: product_name }); // Atualiza os filtros sempre que a URL mudar
    }, [location.search]); // Depende do `location.search`

    useEffect(() => {
        async function loadAllOffers() {
            try {
                const [sellData, buyData] = await Promise.all([
                    getOffersWithFilters({ ...filters, type: "sell" }),
                    getOffersWithFilters({ ...filters, type: "buy" })
                ]);

                setSellOffers(sortOffers(sellData, sortOption));
                setBuyOffers(sortOffers(buyData, sortOption));
            } catch (error) {
                console.error("Erro ao carregar ofertas:", error);
            }
        }

        loadAllOffers();
    }, [filters, sortOption]); // Recarrega sempre que `filters` ou `sortOption` mudar

    // Função para ordenar as ofertas
    const sortOffers = (offers, option) => {
        switch (option) {
            case "price_asc": return [...offers].sort((a, b) => a.price - b.price);
            case "price_desc": return [...offers].sort((a, b) => b.price - a.price);
            case "date_asc": return [...offers].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case "date_desc": return [...offers].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            default: return offers;
        }
    };

    return (
        <>
            <Header />
            <main className='search_main'>
                <SearchBar onSearch={setFilters} initialProductName={product_name} />
                <div className='search_results'>
                    <div className="sorting-options">
                        <label htmlFor="sorting">Ordenar por: </label>
                        <select
                            id="sorting"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="price_asc">Preço (menor primeiro)</option>
                            <option value="price_desc">Preço (maior primeiro)</option>
                            <option value="date_asc">Data (mais recente primeiro)</option>
                            <option value="date_desc">Data (mais antiga primeiro)</option>
                        </select>
                    </div>
                    <div className='tab-buttons'>
                        <button className={activeTab === "sell" ? "active" : ""} onClick={() => setActiveTab("sell")}>
                            Ofertas de Venda
                        </button>
                        <button className={activeTab === "buy" ? "active" : ""} onClick={() => setActiveTab("buy")}>
                            Ofertas de Compra
                        </button>
                    </div>

                    {activeTab === "sell" && (
                        sellOffers.length > 0 ? (
                            <div className='group'>
                                {sellOffers.map((sellOffer) => (
                                    <SellCard key={sellOffer._id} offer={sellOffer} />
                                ))}
                            </div>
                        ) : (
                            <div className='empty-search'>
                                <h1>Não há ofertas de venda disponíveis.</h1>
                            </div>
                        )
                    )}

                    {activeTab === "buy" && (
                        buyOffers.length > 0 ? (
                            <div className='group'>
                                {buyOffers.map((buyOffer) => (
                                    <BuyCard key={buyOffer._id} offer={buyOffer} />
                                ))}
                            </div>
                        ) : (
                            <div className='empty-search'>
                                <h1>Não há ofertas de compra disponíveis.</h1>
                            </div>
                        )
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
