import axios from "axios";

const URL = "http://localhost:3000"

export async function getSellOffers() {
    const response = await axios.get(`${URL}/sell_offer`);

    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

export async function getSellOffer(id) {
    const response = await axios.get(`${URL}/sell_offer/${id}`);

    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

export async function createSellOffer(offer) {
    const response = await axios.post(`${URL}/sell_offer`, offer);

    return response;
}

export async function updateSellOffer(id, offer) {
    const response = await axios.put(`${URL}/sell_offer/${id}`, offer);

    return response;
}

export async function deleteSellOffer(id) {
    const response = await axios.delete(`${URL}/sell_offer/${id}`);

    return response;
}

//Buying
export async function getBuyOffers() {
    const response = await axios.get(`${URL}/buy_offer`);

    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

export async function getBuyOffer(id) {
    const response = await axios.get(`${URL}/buy_offer/${id}`);

    if (response.status === 200) {
        return response.data;
    } else {
        return;
    }
}

export async function createBuyOffer(offer) {
    const response = await axios.post(`${URL}/buy_offer`, offer);

    return response;
}

export async function updateBuyOffer(id, offer) {
    const response = await axios.put(`${URL}/buy_offer/${id}`, offer);

    return response;
}

export async function deleteBuyOffer(id) {
    const response = await axios.delete(`${URL}/buy_offer/${id}`);

    return response;
}