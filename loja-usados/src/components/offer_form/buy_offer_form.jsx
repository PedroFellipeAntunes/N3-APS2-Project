import { useState } from "react";

export default function BuyOfferForm() {
  const [formData, setFormData] = useState({
    name: "",
    maxPrice: "",
    category: "",
    brand: "",
    maxUsageTime: "",
    overclocked: false,
    warrantyRequired: false,
    location: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados da oferta de compra:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="buyOfferForm">
      <h2>Criar Oferta de Compra</h2>
      <label>
        Nome do Produto:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Preço Máximo (R$):
        <input type="number" name="maxPrice" value={formData.maxPrice} onChange={handleChange} required />
      </label>
      <label>
        Categoria:
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </label>
      <label>
        Marca:
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
      </label>
      <label>
        Tempo Máximo de Uso (meses):
        <input type="number" name="maxUsageTime" value={formData.maxUsageTime} onChange={handleChange} />
      </label>
      <label>
        <input type="checkbox" name="overclocked" checked={formData.overclocked} onChange={handleChange} />
        Aceita Overclocked
      </label>
      <label>
        <input type="checkbox" name="warrantyRequired" checked={formData.warrantyRequired} onChange={handleChange} />
        Requer Garantia
      </label>
      <label>
        Localização:
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>
      <button type="submit">Criar Oferta</button>
    </form>
  );
}
