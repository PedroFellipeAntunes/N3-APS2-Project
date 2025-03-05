import { useState, useEffect } from "react";

export const SearchBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        category: "gpu",
        overclocked: null,
        warranty: null,
        repaired: null,
    });

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Chama onFilterChange apenas quando filters muda
    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    return (
        <div className="search-bar">
            <h3>Filtrar Ofertas</h3>
            
            {/* Categoria */}
            <label>Categoria:</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="gpu">GPU</option>
                <option value="cpu">CPU</option>
                <option value="motherboard">Placa-mãe</option>
                <option value="ram">Memória RAM</option>
            </select>
            
            {/* Overclocked */}
            <label>Overclocked:</label>
            <div>
                <input type="radio" name="overclocked" value="true" onChange={handleFilterChange} /> Sim
                <input type="radio" name="overclocked" value="false" onChange={handleFilterChange} /> Não
            </div>
            
            {/* Garantia */}
            <label>
                <input type="checkbox" name="warranty" onChange={handleFilterChange} /> Apenas com garantia
            </label>
            
            {/* Reparado */}
            <label>
                <input type="checkbox" name="repaired" onChange={handleFilterChange} /> Apenas reparados
            </label>
        </div>
    );
};
