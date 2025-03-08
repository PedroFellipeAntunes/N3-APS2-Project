import { categories } from "../../../services/options";

function ProductDetails({ formData, setFormData }) {
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
    
        setFormData({
            ...formData,
            product: {
                ...formData.product,
                category: selectedCategory,
                overclock: ["CPU", "GPU", "RAM"].includes(selectedCategory)
                    ? formData.product.overclock // Mantém os valores existentes
                    : { status: false, speed: "" }, // Reseta os valores
            },
        });
    };    

    return (
        <section>
            <fieldset>
                <legend>Informação Basica</legend>
                <label>
                    Nome do Produto:
                    <input
                        type="text"
                        value={formData.product.name}
                        onChange={(e) => setFormData({ ...formData, product: { ...formData.product, name: e.target.value } })}
                        required
                    />
                </label>
                <label>
                    Preço (R$):
                    <input
                        type="number"
                        step="0.01" // Para permitir valores decimais
                        value={formData.price}
                        placeholder="0,00"
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        required
                    />
                </label>
                <label>
                    Quantidade:
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                                checked={formData.product.overclock.status}
                                onChange={(e) => setFormData({
                                    ...formData, product: { ...formData.product, overclock: { ...formData.product.overclock, status: e.target.checked } }
                                })}
                            />
                            Overclock
                        </label>
                        {formData.product.overclock.status && (
                            <label>
                                Velocidade:
                                <input
                                    type="text"
                                    value={formData.product.overclock.speed}
                                    onChange={(e) => setFormData({
                                    ...formData, product: { ...formData.product, overclock: { ...formData.product.overclock, speed: e.target.value } }
                                    })}
                                    required
                                />
                            </label>
                        )}
                    </fieldset>
                )}
                
                <label>
                    Fabricante:
                    <input
                        type="text"
                        value={formData.product.manufacturer}
                        onChange={(e) => setFormData({
                        ...formData, product: { ...formData.product, manufacturer: e.target.value }
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
                        ...formData, product: { ...formData.product, brand: e.target.value }
                        })}
                        required
                    />
                </label>
            </fieldset>
        </section>
    );
}

export default ProductDetails;