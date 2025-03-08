import { usageCategories, usageTypes, filterUsageCategories } from "../../../services/options";

function UsageDetails({ formData, setFormData }) {
    const handleUsageCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        setFormData({
            ...formData,
            product: {
                ...formData.product,
                usage_category: selectedCategory,
                // Limpar o tempo de uso e tipo de uso se a categoria não fizer match com o array filterUsageCategories
                usage_time_months: !filterUsageCategories.includes(selectedCategory) ? "" : formData.product.usage_time_months,
                usage_type: !filterUsageCategories.includes(selectedCategory) ? [] : formData.product.usage_type, // Resetar os checkboxes
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

    // Verificar se a categoria de uso selecionada faz match com qualquer item em filterUsageCategories
    const showUsageFields = filterUsageCategories.some(category => category === formData.product.usage_category);

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

                    {/* Exibe o campo de tempo de uso caso a categoria de uso permita */}
                    {showUsageFields && (
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

                {/* Exibe o campo de tipo de uso caso a categoria de uso permita */}
                {showUsageFields && (
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
