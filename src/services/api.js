import axios from "axios";


const key = '39407568-0a070d3ffff032a43909d6f38';
const BASE_URL = "https://pixabay.com/api";

const instance = axios.create({ baseURL: BASE_URL });

export const requestHits = async (query = "cat", page = 1) => {
    const { data } = await instance.get(`/`, {
        params: {
            q: query,
            page: page,
            key: key,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
        }
    }); 

    return data;
}

