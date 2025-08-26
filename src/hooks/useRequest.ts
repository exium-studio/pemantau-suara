import { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";
import request from "../lib/request";
import useFireToast from "./useFireToast";

interface Request__Interface {
  config: AxiosRequestConfig;
}

interface Props {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

const useRequest = ({
  showSuccessToast = true,
  showErrorToast = true,
}: Props = {}) => {
  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [response, setResponse] = useState<any>(undefined);
  const [error, setError] = useState<boolean>(false);

  // Utils
  const { fireToast } = useFireToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Make request func
  function req({ config }: Request__Interface) {
    setLoading(true);
    setError(false);
    setStatus(undefined);

    // Abort request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Start request
    request(config)
      .then((r) => {
        setStatus(r.status);
        if (r.status === 200 || r.status === 201) {
          setResponse(r);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e);

        setStatus(e.response?.status);
        setResponse(e.response);

        // Handle common errors such as network issues
        // Network Error atau Timeout
        if (e.code === "ERR_NETWORK") {
          fireToast({
            status: "error",
            title:
              "Network error: Gagal terhubung ke server. Periksa jaringan Anda.",
          });
        }

        // Check if the error is due to request cancellation
        if (e.code !== "ERR_CANCELED") {
          // Set error if the request fails and is not canceled
          setError(true);
          setLoading(false);
        }
      })
      .finally(() => {});
  }

  // Handle toast by response status
  useEffect(() => {
    if (!loading && status) {
      switch (status) {
        case 200:
        case 201:
          showSuccessToast &&
            fireToast({
              status: "success",
              title:
                typeof response?.data?.message === "string"
                  ? response?.data?.message
                  : "Maaf terjadi kendala",
            });
          break;
        case 400:
        case 401:
        case 403:
        case 404:
        case 500:
          showErrorToast &&
            fireToast({
              status: "error",
              title:
                typeof response?.data?.message === "string"
                  ? response?.data?.message
                  : "Maaf terjadi kendala",
            });
          break;
      }
    }
  }, [
    loading,
    status,
    fireToast,
    response?.data?.message,
    showSuccessToast,
    showErrorToast,
  ]);

  return {
    req,
    loading,
    setLoading,
    status,
    setStatus,
    response,
    setResponse,
    error,
    setError,
  };
};

export default useRequest;
