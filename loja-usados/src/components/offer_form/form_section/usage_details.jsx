import { usageCategories, usageTypes } from "../../../services/options";

function UsageDetails({ formData, setFormData }) {
    const handleUsageCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        
        setFormData({
            ...formData,
            product: {
                ...formData.product,
                usage_category: selectedCategory,
                usage_time_months: selectedCategory === "Novo" || selectedCategory === "Caixa Aberta" ? "" : formData.product.usage_time_months,
                usage_type: selectedCategory === "" || selectedCategory === "Novo" || selectedCategory === "Caixa Aberta" ? [] : formData.product.usage_type, // Resetar os checkboxes
            },
        });
    };

    const handleUsageTypeChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedUsageTypes = checked
                ? [...prevData.product.usage_type, value]
                : prevData.product.usage_type.filter((type) => type !== value);

            return {
                ...prevData,
                product: {
                    ...prevData.product,
                    usage_type: updatedUsageTypes,
                },
            };
        });
    };

    return (
        <section>
            <fieldset className="usage">
                <legend>Uso</legend>
                <section>
                    <label>
                        Categoria de Uso:
                        <select
                            value={formData.product.usage_category}
                            onChange={handleUsageCategoryChange}
                            required
                        >
                            <option value="">Selecione</option>
                            {usageCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>

                    {formData.product.usage_category && formData.product.usage_category !== "Novo" && formData.product.usage_category !== "Caixa Aberta" && (
                        <label>
                            Tempo de Uso (meses):
                            <input
                                type="number"
                                value={formData.product.usage_time_months}
                                onChange={(e) => setFormData({ ...formData, product: { ...formData.product, usage_time_months: e.target.value } })}
                                required
                            />
                        </label>
                    )}
                </section>

                {formData.product.usage_category && formData.product.usage_category !== "Novo" && formData.product.usage_category !== "Caixa Aberta" && (
                    <section>
                        <fieldset className="form-usage-types">
                            <legend>Tipos de uso (Selecione ao menos um)</legend>
                            {usageTypes.map((type) => (
                                <label key={type}>
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={formData.product.usage_type.includes(type)}
                                        onChange={handleUsageTypeChange}
                                    />
                                    {type}
                                </label>
                            ))}
                        </fieldset>
                    </section>
                )}
            </fieldset>
        </section>
    );
}

export default UsageDetails;
