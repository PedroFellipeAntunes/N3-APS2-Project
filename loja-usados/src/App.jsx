import { useState, useEffect } from 'react'
import { getSellOffer, getSellOffers, createSellOffer, updateSellOffer, deleteSellOffer, getSellOffersWithFilters } from './services/api';
import { getBuyOffer, getBuyOffers, createBuyOffer, updateBuyOffer, deleteBuyOffer, getBuyOffersWithFilters } from './services/api';
import axios from "axios";
import { Header } from "./components/header"
import './App.css'

function App() {
  const [offers, setOffers] = useState()

  //TESTE DE INSERIR
  function createPostSell() {
    let postObject = {
      "user_id": "67c4a207cdef29ea0eb6d281",
      "price": 333, // Garantindo que seja inteiro
      "negotiable": true,
      // "created_at": new Date(),
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
      "images": [],
      "product": {
        "category": "gpu",
        "name": "NVIDIA RX 1080",
        "manufacturer": "NVIDIA",
        "brand": "ASUS",
        "usage_category": "used",
        "usage_time_months": 3,
        "usage_type": ["AI training"],
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

    createSellOffer(postObject);
    createBuyOffer(postObject);
  }

  function createPostBuy() {
    let postObject = {
      "user_id": "67c4a207cdef29ea0eb6d281",
      "max_price": 333, // Garantindo que seja inteiro
      "negotiable": true,
      // "created_at": new Date(),
      "location": {
        "state": "MG",
        "city": "Aguas Vermelhas",
        "restricted_area": false,
        "range": null
      },
      "retrival": {
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
      //No auctions when new
    };

    createBuyOffer(postObject);
  }

  //TESTE DE PEGAR TODOS OS DADOS DO BACKEND
  useEffect(() => {
    async function loadAllOffers() {
      const filters = {
        // usage_category: "used",
        // max_price: 1000
        // manufacturer: "AMD"
      };

      let data = await getBuyOffersWithFilters(filters);

      if (data) {
        setOffers(data);
      }
    }

    loadAllOffers();
  }, []);

  //Home Page (no need for account, show all sell offers)
  //Buy Offer Page (visualize only buy offers)
  //Login Page (Create account or login)
  //Search Page (allows to filter content, has a variant for )
  //View offer Selling page
  //View offer buying page
  //Create offer page
  //Account page
  //Chat page (when negotiating a price for selling we need a page/or model element for the chat)
  //No access page
  //About page
  
  return (
    <>
      <Header />
      {JSON.stringify(offers)}
      <button onClick={createPostSell}>create Sell</button>
      <button onClick={createPostBuy}>create Buy</button>
    </>
  )
}

export default App
