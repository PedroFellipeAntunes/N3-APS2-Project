import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getSellOffer } from "../../services/api";

import { useState, useEffect } from "react";

import './index.css'

export default function NotFound() {
  useEffect (() => {
    async function loadSellOffer() {
      
    }
  }, []);

  return (
    <>
      <Header />
      <main className="viewOffer_main">
        <div>
          <h1>
              AQUI VAI TER A OFERTA
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}