import { useState } from "react";
import "./index.css";

export function AuctionCard({ offer, isSelected, onSelect }) {
    const formattedPrice = parseFloat(offer.price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const renderCategoryAndBrand = () => (
        <div className="card-info">
            <h2 className="product-brand">{offer.product.brand}</h2>
            <h2 className="product-category">{offer.product.usage_category}</h2>
        </div>
    );

    return (
        <div 
            className={`auction-card ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(offer)} // Chama a função para selecionar o card
        >
            <h1 className="product-name">{offer.product.name}</h1>
            {renderCategoryAndBrand()}
            <div className="price">
                <h2 className="price-value">{formattedPrice}</h2>
            </div>
        </div>
    );
}
