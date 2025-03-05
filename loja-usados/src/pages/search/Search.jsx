import { useState, useEffect } from 'react';

import { getSellOffersWithFilters, getBuyOffers } from '../../services/api';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { SellCard } from '../../components/card/sell_card';
import { BuyCard } from '../../components/card/buy_card';
import { SearchBar } from '../../components/lateral_search_bar';

import './index.css';

export default function Search() {
    const [sellOffers, setSellOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [activeTab, setActiveTab] = useState("sell"); // 'sell' ou 'buy'
    const [filters, setFilters] = useState({});

    useEffect(() => {
        async function loadAllOffers() {
            // let f = {
            //     category: "gpu",
            //     manufacturer: "AMD",
            //     repaired: true
            // }
            const dataSell = await getSellOffersWithFilters(filters);
            // const dataBuy = await getBuyOffersWithFilters(filters);
            const dataBuy = await getBuyOffers();

            setSellOffers(dataSell);
            setBuyOffers(dataBuy);
        }

        loadAllOffers();
    }, [filters]);

    return (
        <>
            <Header />
            <main className='search_main'>
                <SearchBar onFilterChange={setFilters} />
                <div className='search_results'>
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
                    {activeTab === "sell" && (
                        <div className='group'>
                            {sellOffers.map((sellOffer) => (
                                <SellCard key={sellOffer._id} offer={sellOffer} />
                            ))}
                        </div>
                    )}
                    {activeTab === "buy" && (
                        <div className='group'>
                            {buyOffers.map((buyOffer) => (
                                <BuyCard key={buyOffer._id} offer={buyOffer} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
