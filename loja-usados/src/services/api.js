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
        console.error("Erro ao buscar ofertas:", error);
        return [];
    }
}

export async function getOffersByUser(user_id) {
    try {
        const response = await axios.get(`${URL}/offer/user/${user_id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error("Erro ao buscar ofertas:", error);
        return null;
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
        console.error("Erro ao buscar oferta:", error);
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
        console.error("Erro ao buscar ofertas com filtros:", error);
        return [];
    }
}

export async function createOffer(offer) {
    try {
        return await axios.post(`${URL}/offer`, offer);
    } catch (error) {
        console.error("Erro ao criar oferta:", error);
        throw error;
    }
}

export async function updateOffer(id, offer) {
    try {
        return await axios.put(`${URL}/offer/${id}`, offer);
    } catch (error) {
        console.error("Erro ao atualizar oferta:", error);
        throw error;
    }
}

export async function deleteOffer(id) {
    try {
        return await axios.delete(`${URL}/offer/${id}`);
    } catch (error) {
        console.error("Erro ao excluir oferta:", error);
        throw error;
    }
}

//USER
// export async function getUsers() {
//     try {
//         const response = await axios.get(`${URL}/user`);
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             return [];
//         }
//         console.error("Erro ao buscar usuarios:", error);
//         return [];
//     }
// }

export async function getUser(id) {
    try {
        const response = await axios.get(`${URL}/user/${id}`);

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }

        console.error("Erro ao buscar usuario:", error);
        
        return null;
    }
}

export async function getUserName(id) {
    try {
        const response = await axios.get(`${URL}/user_name/${id}`);

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }

        console.error("Erro ao buscar usuario:", error);
        
        return null;
    }
}

export async function getUserWithFilters(filters) {
    const queryParams = new URLSearchParams(filters).toString();

    try {
        const response = await axios.get(`${URL}/user?${queryParams}`);
        
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }

        console.error("Erro ao buscar usuarios com filtros:", error);

        return null;
    }
}

export async function verifyUser(user) {
    const response = await axios.post(`${URL}/user/login`, user);
    console.log(response);
    if (response.data.success) {
        return response.data.token;
    } else {
        return;
    }
}

export async function createUser(user) {
    const response = await axios.post(`${URL}/user`, user);
    return response;
}

export async function updateUser(id, user) {
    try {
        return await axios.put(`${URL}/user/${id}`, user);
    } catch (error) {
        console.error("Erro ao atualizar usuario:", error);
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        return await axios.delete(`${URL}/user/${id}`);
    } catch (error) {
        console.error("Erro ao excluir usuario:", error);
        throw error;
    }
}