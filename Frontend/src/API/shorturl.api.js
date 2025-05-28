import { axiosInstance as ax } from "../utils/axiosInstance.js";

export const createShortUrl = async(url) => {
    const { data } = await ax.post("/api/create", { url });
    return data.data;
};

export const createCustomShortUrl = async(url, slug) => {
    const { data } = await ax.post("/api/create/custom", { url , slug });
    return data.data;
};