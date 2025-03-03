import { useState, useEffect } from 'react'
import { getSellOffer, getSellOffers, createSellOffer, updateSellOffer, deleteSellOffer } from './services/api';
import { getBuyOffer, getBuyOffers, createBuyOffer, updateBuyOffer, deleteBuyOffer } from './services/api';
import axios from "axios";
import './App.css'

function App() {
  const [offers, setOffers] = useState()

  //TESTE DE INSERIRw
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
        "overclocked": true,
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

    createBuyOffer(postObject);
  }

  //TESTE DE PEGAR TODOS OS DADOS DO BACKEND
  // useEffect(() => {
  //   async function loadAllOffers() {
  //     let data = await getSellOffers();

  //     if (data) {
  //       setOffers(data);
  //     }
  //   }

  //   loadAllOffers();
  // }, []);
  
  return (
    <>
      <button onClick={createPostSell}>create Sell</button>
      <button onClick={createPostBuy}>create Buy</button>
    </>
  )
}

export default App
