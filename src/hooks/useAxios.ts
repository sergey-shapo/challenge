import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";

const useAxios = <T>(url: string, params = {}) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios(url, params);
        setData(response.data);
      } catch (error) {
        setError(
          error instanceof AxiosError
            ? error.message
            : "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [url, memoizedParams]);

  return { data, isLoading, error };
};

export default useAxios;
