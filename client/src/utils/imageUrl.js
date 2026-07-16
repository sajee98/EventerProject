import api from "../api/axios.js";

const API_ORIGIN = (api.defaults.baseURL || "")
    .replace(/\/?api\/?$/i, "");


export function resolveImageUrl(path) {

    if (!path) return null;
    if (
        /^https?:\/\//i.test(path) ||
        path.startsWith("data:")
    ) {
        return path;
    }


    const cleanPath = path.replace(/^\/+/, "");
    return `${API_ORIGIN}/${cleanPath}`;
}