const ObjectId = require('mongodb').ObjectId;

function buildOfferQuery(params) {
    let query = {};

    if (params._id) {
        // Verifica se params._id é um array (se foi enviado corretamente pelo frontend)
        const idsArray = Array.isArray(params._id) ? params._id : params._id.split(",");
    
        // Converte cada string em um ObjectId
        query["_id"] = { $in: idsArray.map(id => new ObjectId(id)) };
    }

    if (params.user_id) {
        query["user_id"] = params.user_id;
    }

    if (params.type) {
        query["type"] = params.type;
    }

    // Filtrando por preço mínimo e máximo
    if (params.min_price) {
        const minPrice = Math.ceil(parseFloat(params.min_price) * 100);  // Multiplica por 100 e arredonda para cima
        
            query.price = { $gte: minPrice };  // Converte para Int32
        
    }
    
    if (params.max_price) {
        const maxPrice = Math.ceil(parseFloat(params.max_price) * 100);  // Multiplica por 100 e arredonda para cima
        
            query.price = { ...query.price, $lte: maxPrice };  // Converte para Int32
        
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

function buildUserQuery(params) {
    let query = {};

    // Filtrar por email
    if (params.email) {
        query.email = params.email;
    }

    // CPF
    if (params.cpf) {
        query.cpf = params.cpf;
    }

    // Pass
    if (params.password) {
        query.password = params.password;
    }

    // console.log(query);

    return query;
}

module.exports = { buildOfferQuery, buildUserQuery };