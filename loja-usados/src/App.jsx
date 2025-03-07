import { useState, useEffect } from 'react';
// import { getSellOffer, getSellOffers, createSellOffer, updateSellOffer, deleteSellOffer, getSellOffersWithFilters } from './services/api';
// import { getBuyOffer, getBuyOffers, createBuyOffer, updateBuyOffer, deleteBuyOffer, getBuyOffersWithFilters } from './services/api';
import { getOffersWithFilters, createOffer } from './services/api';
import axios from "axios";
import { Header } from "./components/header";
import { Banner } from "./components/banner";
import { Footer } from "./components/footer";
import './App.css';

// Função para converter imagem para Base64
import { convertToBase64 } from './services/convertBase64';

function App() {
  const [offers, setOffers] = useState([]);
  const [images, setImages] = useState([]); // Para armazenar imagens em Base64

  // Função para converter todas as imagens e enviar para o backend
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const imageBase64Array = [];

    // Converter cada imagem para Base64
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await convertToBase64(file);
      imageBase64Array.push(base64);
    }

    setImages(imageBase64Array); // Atualiza o estado com as imagens convertidas
  };

  // Função para criar uma oferta de venda
  function createPostSell() {
    let postObject = {
      "user_id": "67c4a207cdef29ea0eb6d281",
      "price": 123456, // Garantindo que seja inteiro
      "negotiable": true,
      "type": "sell",
      "location": {
        "state": "MG",
        "city": "Aguas Vermelhas",
        "restricted_area": false,
        "range": null
      },
      "delivery": {
        "in_person": true,
        "shipping": true
      },
      "images": images, // Imagens convertidas para base64
      "product": {
        "category": "gpu",
        "name": "TEST MANY IMAGES",
        "manufacturer": "AMD",
        "brand": "ASUS",
        "usage_category": "Reparado",
        "usage_time_months": 3,
        "usage_type": ["Gaming"],
        "overclocked": true, //GPU only stuff
        "vram": "8gb",
        "clock_speed": "1607MHz",
        "repaired": {
          "status": true,
          "description": "Fucked"
        },
        "warranty": {
          "available": true,
          "valid_until": "2025-09-10"
        }
      }
    };

    createOffer(postObject);
  }

  // Função para criar uma oferta de compra
  function createPostBuy() {
    let postObject = {
      "user_id": "67c4a207cdef29ea0eb6d281",
      "max_price": 333, // Garantindo que seja inteiro
      "negotiable": true,
      "type": "buy",
      "location": {
        "state": "MG",
        "city": "Aguas Vermelhas",
        "restricted_area": false,
        "range": null
      },
      "retrieval": {
        "in_person": true,
        "shipping": true
      },
      "product": {
        "category": "gpu",
        "name": "NVIDIA RX 1080",
        "manufacturer": "NVIDIA",
        "brand": "ASUS",
        "usage_category": ["used"],
        "max_usage_time_months": 3,
        "usage_categories": ["AI training"],
        "overclocked": true,
        "vram": "8gb",
        "clock_speed": "1607MHz",
        "repaired": {
          "status": true,
          "description": "Fucked"
        },
        "warranty": {
          "available": true,
          "min_valid_until": "2025-09-10"
        }
      }
    };

    createOffer(postObject);
  }

  // Função para carregar todas as ofertas de compra
  useEffect(() => {
    async function loadAllOffers() {
      const filters = {
        // Add any filters you want to apply here
      };

      let data = await getOffersWithFilters(filters);

      if (data) {
        setOffers(data);
      }
    }

    loadAllOffers();
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <main>
        {JSON.stringify(offers)}
        
        {/* Input para o upload de imagens */}
        <input type="file" multiple onChange={handleImageUpload} />
        
        <button onClick={createPostSell}>Create Sell Offer</button>
        <button onClick={createPostBuy}>Create Buy Offer</button>
      </main>
      <Footer />
    </>
  );
}

export default App;
