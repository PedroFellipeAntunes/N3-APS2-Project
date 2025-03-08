function RepairWarranty({ formData, setFormData }) {
    return (
      <section>
            <fieldset>
                <legend>Reparado</legend>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.product.repaired.status}
                        onChange={(e) => setFormData({
                            ...formData, product: { ...formData.product, repaired: { ...formData.product.repaired, status: e.target.checked } }
                        })}
                    />
                    Já foi reparado
                </label>
                {formData.product.repaired.status && (
                    <label>
                        Descrição do reparo:
                        <textarea
                            value={formData.product.repaired.description}
                            onChange={(e) => setFormData({
                                ...formData, product: { 
                                    ...formData.product, 
                                    repaired: { 
                                        ...formData.product.repaired, 
                                        description: e.target.value 
                                    } 
                                }
                            })}
                            className="repair-desc"
                            required
                        />
                    </label>
                )}
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
                            value={formData.product.warranty.valid_until}
                            onChange={(e) => setFormData({
                            ...formData, product: { ...formData.product, warranty: { ...formData.product.warranty, valid_until: e.target.value } }
                            })}
                            required
                        />
                    </label>
                )}
            </fieldset>
      </section>
    );
}

export default RepairWarranty;  