import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch<T = unknown>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return { data, loading, isFetching };
}
