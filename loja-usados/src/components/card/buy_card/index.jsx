import { Link } from 'react-router-dom';
import "./index.css";

export function BuyCard({ offer }) {
    const formattedPrice = parseFloat(offer.price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const usageTypes = offer.product.usage_type || [];
    const usageCategories = offer.product.usage_categories || [];

    const renderUsageCategories = () => {
        const limitedUsageCategories = usageCategories.slice(0, 4);  // Considera apenas os primeiros 4 tipos de uso

        return limitedUsageCategories.length > 0 ? (
            <div className="usage-type-container">
                {limitedUsageCategories.map((type, index) => (
                    <span 
                        key={index} 
                        className="usage-category" 
                        onClick={() => handleFilterClick("usage_categories", type)}
                    >
                        {type}
                    </span>
                ))}
            </div>
        ) : null;
    };

    const renderUsageTypes = () => {
        const limitedUsageTypes = usageTypes.slice(0, 4);  // Considera apenas os primeiros 4 tipos de uso

        return limitedUsageTypes.length > 0 ? (
            <div className="usage-type-container">
                {limitedUsageTypes.map((type, index) => (
                    <span 
                        key={index} 
                        className="usage-type" 
                        onClick={() => handleFilterClick("usage_type", type)}
                    >
                        {type}
                    </span>
                ))}
            </div>
        ) : null;
    };

    const renderBrand = () => (
        <div className="card-info">
            <h2 
                className="product-brand" 
                onClick={() => handleFilterClick("brand", offer.product.brand)} // Marca como filtro
            >
                {offer.product.brand}
            </h2>
        </div>
    );

    return (
        <Link to={`/offer/${offer._id}`} className="card">
            <div className="card-content">
                <h1 className="product-name">{offer.product.name}</h1>
                {renderBrand()}
                {renderUsageCategories()}
                {renderUsageTypes()}
                <div className="price">
                    <p className="price-value">{formattedPrice}</p>
                </div>
            </div>
        </Link>
    );
}