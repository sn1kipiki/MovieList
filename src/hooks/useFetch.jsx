import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
const apikey = { api_key: "20f25c4d60731b38b949f390471b25cd"}
    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);
        
        fetchDataFromApi(url, apikey)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
