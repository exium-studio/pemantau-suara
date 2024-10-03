import { useEffect, useRef, useState } from "react";
import request from "../lib/request";
import useFireToast from "./useFireToast";
import { AxiosRequestConfig } from "axios";

interface Request__Interface {
  config: AxiosRequestConfig;
}

const useRequest = () => {
  // States
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Utils
  const { fireToast } = useFireToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  // Make Request Func
  function req({ config }: Request__Interface) {
    setLoading(true);

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
        if (r.status === 200) {
          setMessage(r.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.response?.data?.message);

        // Set state error if request fail
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Handle Toast by Response Status
  useEffect(() => {
    if (!loading && status) {
      switch (status) {
        case 200:
          fireToast({ status: "success", title: message });
          break;
        case 400:
          fireToast({ status: "error", title: message });
          break;
        case 403:
          fireToast({ status: "error", title: message });
          break;
        case 404:
          fireToast({ status: "error", title: message });
          break;
        case 500:
          fireToast({ status: "error", title: message });
          break;
      }
    }
  }, [loading, status, message, error]);

  return { req, loading, status, message, error };
};

export default useRequest;
