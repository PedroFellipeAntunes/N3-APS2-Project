import { categories, filterCategories } from "../../../services/options";

function BuyProductDetails({ formData, setFormData }) {
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        
        setFormData({
            ...formData,
            product: {
                ...formData.product,
                category: selectedCategory,
                // Atualize apenas o campo overclocked, sem conflito
                overclocked: filterCategories ? formData.product.overclocked : false,
            },
        });
    };

    return (
        <section>
            <fieldset>
                <legend>Informação Básica</legend>
                <label>
                    Nome do Produto:
                    <input
                        type="text"
                        value={formData.product.name}
                        onChange={(e) => setFormData({ 
                            ...formData, 
                            product: { ...formData.product, name: e.target.value }
                        })}
                        required
                    />
                </label>
                <label>
                    Preço Máximo (R$):
                    <input
                        type="number"
                        step="0.01" // Para permitir valores decimais
                        value={formData.max_price}
                        placeholder="0,00"
                        onChange={(e) => setFormData({
                            ...formData, max_price: parseFloat(e.target.value)
                        })}
                        required
                    />
                </label>
                <label>
                    Categoria de Produto:
                    <select
                        value={formData.product.category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Selecione</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </label>

                {(formData.product.category === "CPU" || formData.product.category === "GPU" || formData.product.category === "RAM") && (
                    <fieldset>
                        <legend>Overclock</legend>
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.product.overclocked}
                                onChange={(e) => setFormData({
                                    ...formData, 
                                    product: { 
                                        ...formData.product, 
                                        overclocked: e.target.checked
                                    }
                                })}
                            />
                            Overclock
                        </label>
                    </fieldset>
                )}

                <label>
                    Fabricante:
                    <input
                        type="text"
                        value={formData.product.manufacturer}
                        onChange={(e) => setFormData({
                            ...formData, 
                            product: { ...formData.product, manufacturer: e.target.value }
                        })}
                        required
                    />
                </label>
                <label>
                    Marca:
                    <input
                        type="text"
                        value={formData.product.brand}
                        onChange={(e) => setFormData({
                            ...formData, 
                            product: { ...formData.product, brand: e.target.value }
                        })}
                        required
                    />
                </label>
                <label>
                    Descrição do produto:
                    <textarea
                        value={formData.product.description}
                        onChange={(e) => setFormData({
                            ...formData, product: { 
                                ...formData.product, description: e.target.value
                            }
                        })}
                        className="repair-desc"
                        required
                    />
                </label>
            </fieldset>
        </section>
    );
}

export default BuyProductDetails;
