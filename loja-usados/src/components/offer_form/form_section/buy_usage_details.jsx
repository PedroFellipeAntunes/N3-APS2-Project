import { usageCategories, usageTypes, filterUsageCategories } from "../../../services/options";

function BuyUsageDetails({ formData, setFormData }) {
    const handleUsageCategoryChange = (e) => {
        const { value, checked } = e.target;

        // Assegurando que usage_categories seja sempre um array
        setFormData((prevData) => {
            const updatedCategories = checked
                ? [...(prevData.product.usage_categories || []), value] // Se undefined, inicializa com array vazio
                : (prevData.product.usage_categories || []).filter((category) => category !== value); // Se undefined, inicializa com array vazio

            // Verificar se pelo menos uma categoria selecionada faz match com o filtro
            const showUsageFields = updatedCategories.some(category =>
                filterUsageCategories.includes(category));

            return {
                ...prevData,
                product: {
                    ...prevData.product,
                    usage_categories: updatedCategories,
                    max_usage_time_months: showUsageFields ? prevData.product.max_usage_time_months : "", // Resetar valor quando não for aplicável
                    usage_type: showUsageFields ? prevData.product.usage_type : [], // Resetar os checkboxes quando não for aplicável
                },
            };
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

    // Determinar se deve exibir os campos de tempo de uso e tipo de uso
    const showUsageFields = formData.product.usage_categories.some(category =>
        filterUsageCategories.includes(category));

    return (
        <section>
            <fieldset className="usage">
                <legend>Uso</legend>
                <section>
                    <label>Categoria de Uso:</label>
                    <section className="usage-categories">
                        {usageCategories.map((category) => (
                            <label key={category}>
                                <input
                                    type="checkbox"
                                    value={category}
                                    checked={formData.product.usage_categories.includes(category)}
                                    onChange={handleUsageCategoryChange}
                                />
                                {category}
                            </label>
                        ))}
                    </section>

                    {showUsageFields && (
                        <section>
                            <label>
                                Tempo de Uso (meses):
                                <input
                                    type="number"
                                    value={formData.product.max_usage_time_months}
                                    onChange={(e) => setFormData({ ...formData, product: { ...formData.product, max_usage_time_months: e.target.value } })}
                                    required
                                />
                            </label>
                        </section>
                    )}
                </section>

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

export default BuyUsageDetails;
