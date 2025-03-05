import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSellOffer } from "../../services/api";
import "./index.css";

export function SellInfo() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [imageError, setImageError] = useState(false); // Estado para gerenciar erros na imagem
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para armazenar o índice da imagem atual

  useEffect(() => {
    async function fetchOffer() {
      try {
        const response = await getSellOffer(id);
        setOffer(response);
      } catch (error) {
        console.error("Erro ao carregar a oferta:", error);
      }
    }

    if (id) {
      fetchOffer();
    }
  }, [id]);

  // Lógica para exibir a imagem padrão se não houver imagens ou se houver erro no carregamento
  const imageSrc = offer?.images?.[currentImageIndex] && !imageError ? offer.images[currentImageIndex] : "/images/default.jpg";

  // Função para avançar para a próxima imagem
  const nextImage = () => {
    if (offer?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % offer.images.length); // Avança, e volta para o início se for a última imagem
    }
  };

  // Função para voltar para a imagem anterior
  const prevImage = () => {
    if (offer?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + offer.images.length) % offer.images.length); // Volta, e vai para a última imagem se for a primeira
    }
  };

  if (!offer) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="sell-info">
      <div className="top-area">
        <div className="images">
          {/* Exibindo a imagem com a lógica de fallback */}
          <img
            src={imageSrc}
            alt={offer.product.name}
            onError={() => setImageError(true)} // Se ocorrer erro, a imagem padrão será carregada
          />
          {/* Controles de navegação */}
          {offer?.images?.length > 1 && (
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
          
          {/* Exibindo o array de usage_type */}
          <p><strong>Tipo de Uso:</strong></p>
          {offer.product.usage_type && offer.product.usage_type.length > 0 && (
            <ul>
                {offer.product.usage_type.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
          )}

          {offer.product.warranty.available && (
            <p><strong>Garantia até:</strong> {offer.product.warranty.valid_until}</p>
          )}
          {offer.product.repaired.status && (
            <p><strong>Descrição de reparo:</strong> {offer.product.repaired.description}</p>
          )}
        </section>

        <section>
          <h2>Entrega</h2>
          <p>{offer.delivery.in_person ? "✅ Retirada em mãos disponível" : "❌ Sem retirada em mãos"}</p>
          <p>{offer.delivery.shipping ? "✅ Envio disponível" : "❌ Sem envio"}</p>
        </section>

        <section>
          <h2>Localização</h2>
          <p>{offer.location.city}, {offer.location.state}</p>
        </section>
      </div>
    </div>
  );
}
