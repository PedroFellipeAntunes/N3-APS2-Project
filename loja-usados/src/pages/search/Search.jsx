import { useState, useEffect } from 'react';
import { getSellOffersWithFilters, getBuyOffersWithFilters } from '../../services/api';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { SellCard } from '../../components/card/sell_card';
import { BuyCard } from '../../components/card/buy_card';
import { SearchBar } from '../../components/lateral_search_bar';
import './index.css';
import { useLocation } from 'react-router-dom';

export default function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const product_name = queryParams.get('product_name') || ''; // Obtém o valor de "product_name" da URL

    const [sellOffers, setSellOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);

    const [activeTab, setActiveTab] = useState("sell"); // 'sell' ou 'buy'

    const [filters, setFilters] = useState({
        name: product_name || "", // Inicialize o filtro com o `product_name` se estiver presente
    });

    const [sortOption, setSortOption] = useState("price_asc"); // Default sort option

    // Função de ordenação
    const sortOffers = (offers, option) => {
        switch (option) {
            case "price_asc":
                return offers.sort((a, b) => a.price - b.price);
            case "price_desc":
                return offers.sort((a, b) => b.price - a.price);
            case "date_asc":
                return offers.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case "date_desc":
                return offers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            default:
                return offers;
        }
    };

    // Carrega as ofertas e aplica a ordenação
    useEffect(() => {
        async function loadAllOffers() {
            const dataSell = await getSellOffersWithFilters(filters);
            const dataBuy = await getBuyOffersWithFilters(filters);
            // const dataBuy = await getBuyOffers();

            // Ordena as ofertas depois de carregadas
            setSellOffers(sortOffers(dataSell, sortOption));
            setBuyOffers(sortOffers(dataBuy, sortOption));
        }

        loadAllOffers();
    }, [filters, sortOption]); // Recarrega sempre que os filtros ou a opção de ordenação mudam

    return (
        <>
            <Header />
            <main className='search_main'>
                {/* Passando o `product_name` para o SearchBar */}
                <SearchBar onSearch={setFilters} initialProductName={product_name} />
                <div className='search_results'>
                    {/* Seletor de ordenação */}
                    <div className="sorting-options">
                        <label htmlFor="sorting">Ordenar por: </label>
                        <select
                            id="sorting"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)} // Atualiza a opção de ordenação
                        >
                            <option value="price_asc">Preço (menor primeiro)</option>
                            <option value="price_desc">Preço (maior primeiro)</option>
                            <option value="date_asc">Data (mais recente primeiro)</option>
                            <option value="date_desc">Data (mais antiga primeiro)</option>
                        </select>
                    </div>
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
