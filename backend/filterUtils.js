function buildOfferQuery(params) {
    let query = {};

    if (params.type) {
        query["type"] = params.type;
    }

    // Filtrando por preço mínimo e máximo
    if (params.min_price) {
        const minPrice = Math.ceil(parseFloat(params.min_price) * 100);  // Multiplica por 100 e arredonda para cima
        if (params.type === "sell") {
            query.price = { $gte: minPrice };  // Converte para Int32
        } else {
            query.max_price = { $gte: minPrice };  // Converte para Int32
        }
    }
    
    if (params.max_price) {
        const maxPrice = Math.ceil(parseFloat(params.max_price) * 100);  // Multiplica por 100 e arredonda para cima
        if (params.type === "sell") {
            query.price = { ...query.price, $lte: maxPrice };  // Converte para Int32
        } else {
            query.max_price = { ...query.max_price, $lte: maxPrice };  // Converte para Int32
        }
    }    

    // Filtrar por localização (estado ou cidade)
    if (params.state) {
        query["location.state"] = params.state;
    }
    if (params.city) {
        query["location.city"] = params.city;
    }

    // Filtrar por categoria do produto
    if (params.category) {
        query["product.category"] = params.category;
    }

    // Filtrar por tempo de uso (máximo de meses)
    if (params.max_usage_time) {
        query["product.usage_time_months"] = { $lte: parseInt(params.max_usage_time) };
    }

    // Filtrar por produto overclocked ou não
    if (params.overclocked) {
        query["product.overclocked"] = params.overclocked === "true";
    }

    // Filtrar por status de reparo
    // if (params.repaired) {
    //     query["product.repaired.status"] = params.repaired === "true";
    // }

    // Filtrar por nome do produto (busca parcial)
    if (params.name) {
        query["product.name"] = { $regex: params.name, $options: "i" };
    }

    // Filtrar por fabricante
    if (params.manufacturer) {
        query["product.manufacturer"] = params.manufacturer;
    }

    // Filtrar por marca
    if (params.brand) {
        query["product.brand"] = params.brand;
    }

    // Filtrar por categoria de uso
    if (params.usage_category) {
        query["product.usage_category"] = params.usage_category;
    }

    // Filtrar por tipo de uso (se contém no array)
    if (params.usage_type) {
        query["product.usage_type"] = params.usage_type;
    }

    // Filtrar por entrega disponível
    if (params.in_person_delivery) {
        query["delivery.in_person"] = params.in_person_delivery === "true";
    }
    if (params.shipping_delivery) {
        query["delivery.shipping"] = params.shipping_delivery === "true";
    }

    // Filtrar por áreas restritas
    if (params.restricted_area) {
        query["location.restricted_area"] = params.restricted_area === "true";
    }

    // Filtrar por garantia válida até uma data
    // Filtrar por garantia disponível
    if (params.warranty_available) {
        query["product.warranty.available"] = params.warranty_available === "true";
        
        if (params.warranty_valid_until) {
            query["product.warranty.valid_until"] = { $gte: params.warranty_valid_until };
        }
    }

    // Filtrar por quantidade mínima disponível
    if (params.min_amount) {
        query.amount = { $gte: parseInt(params.min_amount) };
    }

    // Filtrar por data de criação (somente ofertas recentes)
    if (params.created_after) {
        query.created_at = { $gte: new Date(params.created_after) };
    }

    console.log(query);

    return query;
}

// function buildBuyOfferQuery(params) {
//     let query = {};

//     // Filtrando por preço máximo
//     if (params.max_price) {
//         query.max_price = { $lte: parseInt(params.max_price) };
//     }

//     // Filtrar por possibilidade de negociação
//     if (params.negotiable) {
//         query.negotiable = params.negotiable === "true";
//     }

//     // Filtrar por localização (estado ou cidade)
//     if (params.state) {
//         query["location.state"] = params.state;
//     }
//     if (params.city) {
//         query["location.city"] = params.city;
//     }

//     // Filtrar por categorias de produtos desejados
//     if (params.category) {
//         query["product.category"] = params.category;
//     }

//     // Filtrar por nome do produto (busca parcial)
//     if (params.name) {
//         query["product.name"] = { $regex: params.name, $options: "i" };
//     }

//     // Filtrar por fabricante
//     if (params.manufacturer) {
//         query["product.manufacturer"] = params.manufacturer;
//     }

//     // Filtrar por marca
//     if (params.brand) {
//         query["product.brand"] = params.brand;
//     }

//     // Filtrar por categorias de uso (se contém no array)
//     if (params.usage_category) {
//         query["product.usage_categories"] = params.usage_category;
//     }

//     // Filtrar por tempo máximo de uso aceito (meses)
//     if (params.max_usage_time) {
//         query["product.max_usage_time_months"] = { $lte: parseInt(params.max_usage_time) };
//     }

//     // Filtrar por tipo de uso (se contém no array)
//     if (params.usage_type) {
//         query["product.usage_type"] = params.usage_type;
//     }

//     // Filtrar por produtos overclocked
//     if (params.overclocked) {
//         query["product.overclocked"] = params.overclocked === "true";
//     }

//     // Filtrar por status de reparo
//     // if (params.repaired) {
//     //     query["product.repaired.status"] = params.repaired === "true";
//     // }

//     // Filtrar por garantia disponível
//     if (params.warranty_available) {
//         query["product.warranty.available"] = params.warranty_available === "true";
//     }

//     // Filtrar por garantia mínima válida até certa data
//     if (params.min_warranty_valid_until) {
//         query["product.warranty.min_valid_until"] = { $gte: params.min_warranty_valid_until };
//     }

//     // Filtrar por retirada presencial
//     if (params.in_person_retrieval) {
//         query["retrival.in_person"] = params.in_person_retrieval === "true";
//     }

//     // Filtrar por envio disponível
//     if (params.shipping_retrieval) {
//         query["retrival.shipping"] = params.shipping_retrieval === "true";
//     }

//     // Filtrar por áreas restritas
//     if (params.restricted_area) {
//         query["location.restricted_area"] = params.restricted_area === "true";
//     }

//     // Filtrar por data de criação (somente ofertas recentes)
//     if (params.created_after) {
//         query.created_at = { $gte: new Date(params.created_after) };
//     }

//     console.log(query);

//     return query;
// }

module.exports = { buildOfferQuery };