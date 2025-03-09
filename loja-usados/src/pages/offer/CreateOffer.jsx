import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import SellOfferForm from "../../components/offer_form/sell_offer_form";
import BuyOfferForm from "../../components/offer_form/buy_offer_form";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import "./index.css";

export default function CreateOffer() {
  const [offerType, setOfferType] = useState(null);

  const token = sessionStorage.getItem("user");
  const navigate = useNavigate();

  // Verifique se existe um token de usuário, se não existir volte para home
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <Header />
      <main className="createOffer_main">
        {!offerType ? (
          <div className="offerTypeSelection">
            <h1>Escolha o tipo de oferta</h1>
            <div className="buttons">
                <button onClick={() => setOfferType("sell")} className="sellButton">Vender Produto</button>
                <button onClick={() => setOfferType("buy")} className="buyButton">Comprar Produto</button>
            </div>
          </div>
        ) : (
          <div className="offer-form">
            <div className="go-back">
                <button onClick={() => setOfferType(null)} className="backButton">Voltar</button>
            </div>
            {offerType === "sell" ? <SellOfferForm /> : <BuyOfferForm />}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
