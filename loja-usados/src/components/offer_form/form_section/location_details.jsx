function LocationDetails({ formData, setFormData }) {
    return (
        <fieldset>
            <legend>Localização</legend>
            <label>
                Estado:
                <input
                    type="text"
                    value={formData.location.state}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, state: e.target.value } })}
                    placeholder="SP"
                    required
                />
            </label>
            <label>
                Cidade:
                <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                    placeholder="São Paulo"
                    required
                />
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={formData.location.restricted_area}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, restricted_area: e.target.checked } })}
                />
                Área Restrita
            </label>
            {formData.location.restricted_area && (
                <label>
                    Alcance (Km):
                    <input
                        type="number"
                        value={formData.location.range}
                        onChange={(e) => setFormData({ ...formData, location: { ...formData.location, range: e.target.value } })}
                        required
                    />
                </label>
            )}
        </fieldset>
    );
}

export default LocationDetails;  