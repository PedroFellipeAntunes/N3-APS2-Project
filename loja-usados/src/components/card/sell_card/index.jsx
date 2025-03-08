import { useState } from "react";
import { Link } from 'react-router-dom';
import "./index.css";

export function SellCard({ offer }) {
    const [imageError, setImageError] = useState(false);  // Estado para verificar erro no carregamento da imagem

    const formattedPrice = parseFloat(offer.price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });        

    const isNegotiable = offer.negotiable;
    const usageTypes = offer.product.usage_type || [];

    const renderUsageTypes = () => {
        const limitedUsageTypes = usageTypes.slice(0, 4);  // Considera apenas os primeiros 4 tipos de uso
        
        return limitedUsageTypes.length > 0 ? (
            <div className="usage-type-container">
                {limitedUsageTypes.map((type, index) => (
                    <span 
                        key={index} 
                        className="usage-type" 
                    >
                        {type}
                    </span>
                ))}
            </div>
        ) : null;
    };

    const renderCategoryAndBrand = () => (
        <div className="card-info">
            <h2 
                className="product-brand"
            >
                {offer.product.brand}
            </h2>
            <h2 
                className="product-category"
            >
                {offer.product.usage_category}
            </h2>
        </div>
    );

    const handleImageError = () => {
        setImageError(true); // Define que ocorreu erro no carregamento da imagem
    };

    const imageSrc = offer.images?.[0] && !imageError ? offer.images[0] : "/images/default.jpg";  // A variável agora verifica a imagem

    return (
        <Link to={`/offer/${offer._id}`} className="card">
            <img 
                src={imageSrc} 
                alt={offer.product.name} 
                className="product-image" 
                onError={handleImageError} // Verifica se ocorre erro no carregamento da imagem
            />
            <div className="card-content">
                <h1 className="product-name">{offer.product.name}</h1>
                {renderCategoryAndBrand()}
                {renderUsageTypes()}
                {isNegotiable && <span className="negotiable">Negociável</span>}
                <div className="price">
                    <p className="price-value">{formattedPrice}</p>
                </div>
            </div>
        </Link>
    );
}
