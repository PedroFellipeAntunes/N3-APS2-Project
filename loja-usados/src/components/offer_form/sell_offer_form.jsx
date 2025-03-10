import { useState } from "react";
import { convertToBase64 } from '../../services/convertBase64';
import { createOffer } from "../../services/api";

import ProductDetails from './form_section/product_details';
import UsageDetails from './form_section/usage_details';
import RepairWarranty from './form_section/repair_warranty_details';
import LocationDetails from './form_section/location_details';
import DeliveryOptions from './form_section/delivery_details';
import ImageUpload from './form_section/image_upload';

import "./index.css";

export default function SellOfferForm( {handleReturn} ) {
  // const [formData, setFormData] = useState({
  //   // Defina o estado completo aqui como já está no seu código
  // });

  const [formData, setFormData] = useState({
    type: "sell",
    price: "",
    amount: "",
    negotiable: false,
    location: {
      state: "",
      city: "",
      restricted_area: false,
      range: "",
    },
    delivery: {
      in_person: false,
      shipping: false,
    },
    images: [],
    product: {
      category: "",
      name: "",
      manufacturer: "",
      brand: "",
      usage_category: "",
      usage_time_months: "",
      usage_type: [],
      overclock: {
        status: false,
        speed: "",
      },
      repaired: {
        status: false,
        description: "",
      },
      warranty: {
        available: false,
        valid_until: "",
      },
      description: ""
    },
  });

  const [images, setImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const imageBase64Array = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await convertToBase64(file);
      imageBase64Array.push(base64);
    }
  
    // Update the formData to include the base64 images in the formData object
    setFormData({
      ...formData,
      images: imageBase64Array, // Add the converted base64 images to the formData
    });
    
    setImages(imageBase64Array);  // Defina as imagens como base64
  };

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.product.usage_category !== "Novo" && formData.product.usage_category !== "Caixa Aberta") {
      if (formData.product.usage_type.length <= 0) {
        alert("Selecione pelo menos uma opção tipo de uso.");
        return;
      }
    }
  
    if (!formData.delivery.in_person && !formData.delivery.shipping) {
      alert("Selecione pelo menos uma opção de entrega.");
      return;
    }

    // console.log(formData);
    // return;

    setIsLoading(true); // Ativa o carregamento
  
    // Conectar server
    try {
      const response = await createOffer(formData); // Aguarda a resposta da API

      if (response.status === 200) { // Verifica se foi criado com sucesso
        alert("Oferta criada com sucesso!");
        handleReturn();
        // Deve redirecionar para a pagina de ofertas do USER
        // navigate("/minhas-ofertas");
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
      <h2>Criar Oferta de Venda</h2>

      <ProductDetails formData={formData} setFormData={setFormData} />
      <UsageDetails formData={formData} setFormData={setFormData} />
      <RepairWarranty formData={formData} setFormData={setFormData} />
      <LocationDetails formData={formData} setFormData={setFormData} />
      <DeliveryOptions formData={formData} setFormData={setFormData} />

      <ImageUpload images={images} setImages={setImages} handleImageUpload={handleImageUpload} />

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
