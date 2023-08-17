import axios from "axios";
import { useState } from "react";

export const useFetch = (url, requestOptions) => {
  const [resData, setResData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.request({
        url,
        ...requestOptions,
      });
      const data = response.data;
      setIsLoading(false);
      setResData(data);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return {
    fetchData,
    resData,
    error,
    isLoading,
  };
};
