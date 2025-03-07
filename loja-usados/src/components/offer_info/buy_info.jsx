import { useState, useEffect } from "react";
import "./index.css";

export function BuyInfo({ offer }) {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!offer) {
    return <p>Carregando...</p>;
  }

  const imageSrc = offer.images?.[currentImageIndex] && !imageError ? offer.images[currentImageIndex] : "/images/default.jpg";

  const nextImage = () => {
    if (offer.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % offer.images.length);
    }
  };

  const prevImage = () => {
    if (offer.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + offer.images.length) % offer.images.length);
    }
  };

  return (
    <div className="sell-info">
      <div className="top-area">
        <div className="images">
          <img
            src={imageSrc}
            alt={offer.product.name}
            onError={() => setImageError(true)}
          />
          {offer.images?.length > 1 && (
            <div className="image-navigation">
              <button onClick={prevImage}>←</button>
              <button onClick={nextImage}>→</button>
            </div>
          )}
        </div>
        <div className="basic-info">
          <h1 className="product-name">{offer.product.name}</h1>
          <div className="basic-info-text">
            <h2>{offer.negotiable ? "✅ Oferta Negociável" : ""}</h2>
            <h1>Preço: R$ {(offer.price / 100).toFixed(2)}</h1>
          </div>
        </div>
      </div>

      <div className="bottom-area">
        <section>
          <h2>Detalhes</h2>
          <p><strong>Marca:</strong> {offer.product.brand}</p>
          <p><strong>Categoria:</strong> {offer.product.category}</p>
          <p><strong>Condição:</strong> {offer.product.usage_category}</p>
          <p><strong>Tempo de uso:</strong> {offer.product.usage_time_months} meses</p>
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
          {offer.product.warranty?.available && (
            <p><strong>Garantia até:</strong> {offer.product.warranty.valid_until}</p>
          )}
          {offer.product.repaired?.status && (
            <p><strong>Descrição de reparo:</strong> {offer.product.repaired.description}</p>
          )}
        </section>

        {offer.retrieval && (
            <section>
                <h2>Recebimento de pacote</h2>
                <p>{offer.retrieval.in_person ? "✅ Retirada em mãos disponível" : "❌ Sem retirada em mãos"}</p>
                <p>{offer.retrieval.shipping ? "✅ Envio disponível" : "❌ Sem envio"}</p>
            </section>
        )}

        <section>
          <h2>Localização</h2>
          <p>{offer.location.city}, {offer.location.state}</p>
        </section>
      </div>
    </div>
  );
}
