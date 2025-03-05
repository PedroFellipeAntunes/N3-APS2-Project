import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getSellOffer } from "../../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SellInfo } from "../../components/offer_info/sell_info";

import "./index.css";

export default function ViewOffer() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    async function loadSellOffer() {
      try {
        const response = await getSellOffer(id);
        setOffer(response);
      } catch (error) {
        console.error("Erro ao carregar a oferta:", error);
      }
    }

    if (id) {
      loadSellOffer();
    }
  }, [id]);

  return (
    <>
      <Header />
      <main className="viewOffer_main">
        <SellInfo offer={offer} />
      </main>
      <Footer />
    </>
  );
}
