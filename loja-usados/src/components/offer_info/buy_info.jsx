import { useState } from "react";
import "./buy_info.css";

export function BuyInfo({ offer }) {
  if (!offer) {
    return <p>Carregando...</p>;
  }

  const formattedPrice = parseFloat(offer.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="buy-info">
      <div className="top-area">
        <h1 className="product-name">{offer.product.name}</h1>
        <div className="basic-info-text">
          <h2>Valor máximo: {formattedPrice}</h2>
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
          {offer.product.repaired?.status && (
            <p><strong>Descrição de reparo:</strong> {offer.product.repaired.description}</p>
          )}
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
    </div>
  );
}