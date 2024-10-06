import { useEffect, useRef, useState } from "react";
import useRenderTrigger from "./useRenderTrigger";
import useRequest from "./useRequest";

interface Props<T> {
  initialData?: T;
  url?: string;
  payload?: any;
  dependencies?: any[];
  conditions?: boolean;
  noRt?: boolean;
}

const useDataState = <T>({
  initialData,
  payload,
  url,
  dependencies = [],
  conditions = true,
  noRt = false,
}: Props<T>) => {
  // States
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(initialData);
  const [paginationData, setPaginationData] = useState<any>(undefined);
  const { rt } = useRenderTrigger();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { req, response, loading, error, status } = useRequest({
    successToast: false,
  });

  // useRef to store a stable reference to the request function
  const makeRequestRef = useRef<() => void>(() => {});

  // Define makeRequest inside useEffect but assign it to the ref
  useEffect(() => {
    makeRequestRef.current = () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const method = payload ? "POST" : "GET";
      const data = {
        ...payload,
      };

      const config = {
        method,
        url,
        data: method === "POST" ? data : undefined,
        signal: abortController.signal,
      };

      setData(undefined);

      req({ config });
    };
  }, [payload, req, url]);

  // Handle request via useEffect
  useEffect(() => {
    if (conditions && url) {
      makeRequestRef.current(); // Use the stable ref function
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions, url, ...(noRt ? [] : [rt]), ...dependencies]);

  // Handle response
  useEffect(() => {
    if (response) {
      setData(response?.data?.data);
      setPaginationData(response?.data?.pagination);
    }
  }, [response]);

  function retry() {
    makeRequestRef.current(); // Call the stable function
  }

  function loadMore() {
    setLoadingLoadMore(true);
    // TODO: Handle load more
  }

  const tableState = {
    loading: loading,
    error: error,
    status: status,
    retry: retry,
    data: data,
    paginationData: paginationData,
  };

  return {
    data,
    setData,
    loading,
    error,
    retry,
    loadMore,
    loadingLoadMore,
    setLoadingLoadMore,
    paginationData,
    tableState,
  };
};

export default useDataState;
