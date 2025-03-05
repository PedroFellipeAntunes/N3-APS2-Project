import { categories, usageCategories, usageTypes } from "../../services/options";

import { useState, useEffect } from "react";

import './index.css';

export const SearchBar = ({ onSearch, initialProductName  }) => {
    const [filters, setFilters] = useState({
        min_price: "",
        max_price: "",
        state: "",
        city: "",
        category: [],
        max_usage_time: "",
        overclocked: false,
        warranty_available: false,
        warranty_valid_until: "",
        name: initialProductName || "", // Inicializa com o nome do produto passado
        manufacturer: "",
        brand: "",
        usage_category: [],
        usage_type: [],
        in_person_delivery: false,
        shipping_delivery: false,
        restricted_area: false,
        min_amount: "",
        created_after: ""
    });

    useEffect(() => {
        // Caso o product_name tenha mudado, atualiza o filtro
        setFilters(prevFilters => ({
            ...prevFilters,
            name: initialProductName || ""  // Garante que 'name' nunca seja undefined ou null
        }));
    }, [initialProductName]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
            setFilters((prevFilters) => {
                if (name === "overclocked" || name === "repaired" || name === "warranty_available" || name === "in_person_delivery" || name === "shipping_delivery" || name === "restricted_area") {
                    // Para os checkboxes que são simples (booleanos), atualizamos o estado para true ou false
                    return { ...prevFilters, [name]: checked };
                } else {
                    // Para os checkboxes de lista, como categoria ou tipo de uso, atualizamos como array
                    const selectedValues = Array.isArray(prevFilters[name]) ? prevFilters[name] : [];
                    if (checked) {
                        return { ...prevFilters, [name]: [...selectedValues, value] };
                    } else {
                        return { ...prevFilters, [name]: selectedValues.filter(val => val !== value) };
                    }
                }
            });
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: type === "checkbox" ? checked :
                        type === "number" && value !== "" ? Number(value) : value
            }));
        }
    };

    const handleReset = (e) => {
        e.preventDefault(); // Impede o comportamento padrão de submit
    
        // Reseta os filtros
        setFilters({
            min_price: "",
            max_price: "",
            state: "",
            city: "",
            category: [],
            max_usage_time: "",
            overclocked: false,
            repaired: false,
            warranty_available: false,
            warranty_valid_until: "",
            name: "",
            manufacturer: "",
            brand: "",
            usage_category: [],
            usage_type: [],
            in_person_delivery: false,
            shipping_delivery: false,
            restricted_area: false,
            min_amount: "",
            created_after: ""
        });

        console.log("TST");
    
        // Agora, chama o handleSubmit após resetar os filtros
        handleSubmit(e);
    };    

    const handleSubmit = (e) => {
        e.preventDefault();

        const adjustedFilters = {
            ...filters,
            min_price: filters.min_price ? Math.ceil(parseFloat(filters.min_price) * 100) : "",
            max_price: filters.max_price ? Math.ceil(parseFloat(filters.max_price) * 100) : ""
        };

        const filteredFilters = Object.fromEntries(
            Object.entries(adjustedFilters).filter(([_, value]) => value !== "" && value !== false)
        );

        console.log("Filtros aplicados:", filteredFilters);
        onSearch(filteredFilters);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nome do produto" value={filters.name} onChange={handleChange} />
            <input type="text" name="manufacturer" placeholder="Fabricante" value={filters.manufacturer} onChange={handleChange} />
            <input type="text" name="brand" placeholder="Marca" value={filters.brand} onChange={handleChange} />

            <input type="number" step="0.01" name="min_price" placeholder="Preço mínimo" value={filters.min_price} onChange={handleChange} />
            <input type="number" step="0.01" name="max_price" placeholder="Preço máximo" value={filters.max_price} onChange={handleChange} />

            <input type="text" name="state" placeholder="Estado" value={filters.state} onChange={handleChange} />
            <input type="text" name="city" placeholder="Cidade" value={filters.city} onChange={handleChange} />

            <label>Categoria:</label>
            <div className="check-list">
                {categories.map((cat) => (
                    <label key={cat}>
                        <input 
                            type="checkbox" 
                            name="category" 
                            value={cat} 
                            checked={filters.category.includes(cat)} 
                            onChange={handleChange} 
                        />
                        {cat}
                    </label>
                ))}
            </div>

            <label>Categoria de uso:</label>
            <div className="check-list">
                {usageCategories.map((cat) => (
                    <label key={cat}>
                        <input 
                            type="checkbox" 
                            name="usage_category" 
                            value={cat} 
                            checked={filters.usage_category.includes(cat)} 
                            onChange={handleChange} 
                        />
                        {cat}
                    </label>
                ))}
            </div>

            <label>Tipo de uso:</label>
            <div className="check-list">
                {usageTypes.map((type) => (
                    <label key={type}>
                        <input 
                            type="checkbox" 
                            name="usage_type" 
                            value={type} 
                            checked={filters.usage_type.includes(type)} 
                            onChange={handleChange} 
                        />
                        {type}
                    </label>
                ))}
            </div>

            <input type="number" name="max_usage_time" placeholder="Máximo de meses de uso" value={filters.max_usage_time} onChange={handleChange} />

            <label><input type="checkbox" name="overclocked" checked={filters.overclocked} onChange={handleChange} /> Overclocked</label>

            <label><input type="checkbox" name="warranty_available" checked={filters.warranty_available} onChange={handleChange} /> Garantia disponível</label>
            {filters.warranty_available && (
                <input type="date" name="warranty_valid_until" value={filters.warranty_valid_until} onChange={handleChange} />
            )}

            <label htmlFor="in_person_delivery">
                <input type="checkbox" name="in_person_delivery" checked={filters.in_person_delivery} onChange={handleChange} /> Retirada presencial
            </label>
            <label htmlFor="shipping_delivery">
                <input type="checkbox" name="shipping_delivery" checked={filters.shipping_delivery} onChange={handleChange} /> Envio disponível
            </label>
            <label htmlFor="restricted_area">
                <input type="checkbox" name="restricted_area" checked={filters.restricted_area} onChange={handleChange} /> Área restrita
            </label>

            <label>Data mínima do post:</label>
            <input type="date" name="created_after" value={filters.created_after} onChange={handleChange} />

            <input type="number" name="min_amount" placeholder="Quantidade mínima" value={filters.min_amount} onChange={handleChange} />

            <div className="buttons">
                <button type="submit">Buscar</button>
                <button type="button" onClick={handleReset}>
                    Resetar
                </button>
            </div>
        </form>
    );
};
