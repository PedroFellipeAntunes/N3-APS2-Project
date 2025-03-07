import axios from "axios";

const URL = "http://localhost:3000";

export async function getOffers() {
    try {
        const response = await axios.get(`${URL}/offer`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        console.error("Erro ao buscar ofertas de venda:", error);
        return [];
    }
}

export async function getOffer(id) {
    try {
        const response = await axios.get(`${URL}/offer/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error("Erro ao buscar oferta de venda:", error);
        return null;
    }
}

export async function getOffersWithFilters(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    try {
        const response = await axios.get(`${URL}/offer?${queryParams}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        console.error("Erro ao buscar ofertas de venda com filtros:", error);
        return [];
    }
}

export async function createOffer(offer) {
    try {
        return await axios.post(`${URL}/offer`, offer);
    } catch (error) {
        console.error("Erro ao criar oferta de venda:", error);
        throw error;
    }
}

export async function updateOffer(id, offer) {
    try {
        return await axios.put(`${URL}/offer/${id}`, offer);
    } catch (error) {
        console.error("Erro ao atualizar oferta de venda:", error);
        throw error;
    }
}

export async function deleteOffer(id) {
    try {
        return await axios.delete(`${URL}/offer/${id}`);
    } catch (error) {
        console.error("Erro ao excluir oferta de venda:", error);
        throw error;
    }
}

// Buying
// export async function getBuyOffers() {
//     try {
//         const response = await axios.get(`${URL}/buy_offer`);
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             return [];
//         }
//         console.error("Erro ao buscar ofertas de compra:", error);
//         return [];
//     }
// }

// export async function getBuyOffersWithFilters(filters) {
//     const queryParams = new URLSearchParams(filters).toString();
//     try {
//         const response = await axios.get(`${URL}/buy_offer?${queryParams}`);
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             return [];
//         }
//         console.error("Erro ao buscar ofertas de compra com filtros:", error);
//         return [];
//     }
// }

// export async function getBuyOffer(id) {
//     try {
//         const response = await axios.get(`${URL}/buy_offer/${id}`);
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             return null;
//         }
//         console.error("Erro ao buscar oferta de compra:", error);
//         return null;
//     }
// }

// export async function createBuyOffer(offer) {
//     try {
//         return await axios.post(`${URL}/buy_offer`, offer);
//     } catch (error) {
//         console.error("Erro ao criar oferta de compra:", error);
//         throw error;
//     }
// }

// export async function updateBuyOffer(id, offer) {
//     try {
//         return await axios.put(`${URL}/buy_offer/${id}`, offer);
//     } catch (error) {
//         console.error("Erro ao atualizar oferta de compra:", error);
//         throw error;
//     }
// }

// export async function deleteBuyOffer(id) {
//     try {
//         return await axios.delete(`${URL}/buy_offer/${id}`);
//     } catch (error) {
//         console.error("Erro ao excluir oferta de compra:", error);
//         throw error;
//     }
// }
