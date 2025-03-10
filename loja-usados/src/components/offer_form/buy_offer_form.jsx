import { useState } from "react";
import { createOffer } from "../../services/api"; // Ajuste conforme necessário

import BuyProductDetails from './form_section/buy_product_details';
import BuyUsageDetails from './form_section/buy_usage_details';
import BuyRepairWarranty from './form_section/buy_repair_warranty_details';
import LocationDetails from './form_section/location_details';
import RetrievalOptions from './form_section/retrieval_details';

import "./index.css";

export default function BuyOfferForm( {handleReturn} ) {
  const [formData, setFormData] = useState({
    type: "buy",
    price: "",
    location: {
      state: "",
      city: "",
      restricted_area: false,
      range: "",
    },
    retrieval: {
      in_person: false,
      shipping: false,
    },
    product: {
      category: "",
      name: "",
      manufacturer: "",
      brand: "",
      usage_categories: [],
      max_usage_time_months: "",
      usage_type: [],
      overclocked: false,
      repaired: false,
      warranty: {
        available: false,
        min_valid_until: "",
      },
      description: ""
    }
  });

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.product && formData.product.usage_categories && formData.product.usage_categories.length <= 0) {
      alert("Selecione pelo menos uma opção de categoria de uso.");
      return;
    }  

    if (!formData.retrieval.in_person && !formData.retrieval.shipping) {
      alert("Selecione pelo menos uma opção de entrega.");
      return;
    }

    // console.log(formData);
    // return;

    setIsLoading(true); // Ativa o carregamento

    try {
      const response = await createOffer(formData); // Envia a oferta para o servidor

      if (response.status === 200) {
        alert("Oferta de compra criada com sucesso!");
        handleReturn();
        // Redirecionar ou limpar o formulário
      } else {
        alert("Erro ao criar oferta. Tente novamente.");
      }
    } catch (error) {
      alert("Erro na requisição. Verifique sua conexão.");
      console.error(error);
    } finally {
      setIsLoading(false); // Desativa o carregamento
    }
  };

  return (
    <form onSubmit={handleSubmit} className="offer-form-data">
      <h2>Criar Oferta de Compra</h2>

      <BuyProductDetails formData={formData} setFormData={setFormData} />
      <BuyUsageDetails formData={formData} setFormData={setFormData} />
      <BuyRepairWarranty formData={formData} setFormData={setFormData} />
      <LocationDetails formData={formData} setFormData={setFormData} />
      <RetrievalOptions formData={formData} setFormData={setFormData} />

      <button
        className="create-form-submit"
        type="submit"
        disabled={isLoading} // Desativa o botão quando está carregando
      >
        {isLoading ? "Criando..." : "Criar Oferta"}
      </button>
    </form>
  );
}
