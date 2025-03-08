function RetrievalOptions({ formData, setFormData }) {
    return (
        <fieldset>
            <legend>Opções de Entrega</legend>
            <label>
                <input
                    type="checkbox"
                    checked={formData.retrieval.in_person}
                    onChange={(e) => setFormData({ ...formData, retrieval: { ...formData.retrieval, in_person: e.target.checked } })}
                />
                Retirada Pessoalmente
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={formData.retrieval.shipping}
                    onChange={(e) => setFormData({ ...formData, retrieval: { ...formData.retrieval, shipping: e.target.checked } })}
                />
                Envio por Correios/Transportadora
            </label>
        </fieldset>
    );
}

export default RetrievalOptions;  