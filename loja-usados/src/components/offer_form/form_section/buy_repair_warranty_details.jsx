function BuyRepairWarranty({ formData, setFormData }) {
    return (
      <section>
            <fieldset>
                <legend>Reparado</legend>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.product.repaired}
                        onChange={(e) => setFormData({
                            ...formData, product: { ...formData.product, repaired: e.target.checked }
                        })}
                    />
                    Já foi reparado
                </label>
            </fieldset>
    
            <fieldset>
                <legend>Garantia</legend>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.product.warranty.available}
                        onChange={(e) => setFormData({
                            ...formData, product: { ...formData.product, warranty: { ...formData.product.warranty, available: e.target.checked } }
                        })}
                    />
                    Possui Garantia
                </label>
                {formData.product.warranty.available && (
                    <label>
                        Válida até:
                        <input
                            type="date"
                            value={formData.product.warranty.min_valid_until}
                            onChange={(e) => setFormData({
                            ...formData, product: { ...formData.product, warranty: { ...formData.product.warranty, min_valid_until: e.target.value } }
                            })}
                            required
                        />
                    </label>
                )}
            </fieldset>
      </section>
    );
}

export default BuyRepairWarranty;