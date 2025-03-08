function DeliveryOptions({ formData, setFormData }) {
    return (
        <fieldset>
            <legend>Opções de Entrega</legend>
            <label>
                <input
                    type="checkbox"
                    checked={formData.delivery.in_person}
                    onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, in_person: e.target.checked } })}
                />
                Retirada Pessoalmente
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={formData.delivery.shipping}
                    onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, shipping: e.target.checked } })}
                />
                Envio por Correios/Transportadora
            </label>
        </fieldset>
    );
}

export default DeliveryOptions;  