function ProductDetails({ formData, setFormData }) {
    return (
        <section>
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
        </section>
    );
}

export default ProductDetails;