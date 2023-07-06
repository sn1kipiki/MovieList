import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        params.api_key = "20f25c4d60731b38b949f390471b25cd"
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
