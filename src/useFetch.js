import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);
        (async function () {
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }());
        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}
