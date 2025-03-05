import { useState, useEffect, useRef } from 'react';
import './index.css';

export const Banner = () => {
  const banners = [
    { 
      text: 'Peças de PC de segunda mão, de <span>brasileiro</span> para <span>brasileiro</span>.',
      image: './images/ai_banner.jpeg',
    },
    { 
      text: 'Não fique com dúvidas, tenha todas as informações sobre o produto!',
      image: './images/gpu_repair.webp',
    }
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [resetInterval, setResetInterval] = useState(false);
  const intervalRef = useRef(null);

  // Função para mudar para o próximo banner
  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    resetTimer();
  };

  // Função para mudar para o banner anterior
  const prevBanner = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
    resetTimer();
  };

  // Resetar o intervalo e reiniciar o contador de tempo
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setResetInterval(true); // Força a mudança do estado
  };

  // Mudança automática de banner a cada 5 segundos
  useEffect(() => {
    if (resetInterval) {
      setResetInterval(false);
    }
    intervalRef.current = setInterval(nextBanner, 10000);
    return () => clearInterval(intervalRef.current);
  }, [resetInterval]);

  return (
    <div className="banner">
      <div className="banner-text">
        <h1 dangerouslySetInnerHTML={{ __html: banners[currentBannerIndex].text }} />
      </div>
      <img
        src={banners[currentBannerIndex].image}
        alt="Banner"
        className="banner-image"
      />
      <div className="banner-controls">
        <button className="prev-button" onClick={prevBanner}>←</button>
        <button className="next-button" onClick={nextBanner}>→</button>
      </div>
    </div>
  );
};
