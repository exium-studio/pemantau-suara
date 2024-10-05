import { useEffect, useRef, useState } from "react";
import useRenderTrigger from "./useRenderTrigger";
import useRequest from "./useRequest";

interface Props<T> {
  initialData?: T;
  url?: string;
  payload?: any;
  dependencies?: any[];
  conditions?: boolean;
  page?: number;
  limit?: number;
  noRt?: boolean;
}

const useDataState = <T>({
  initialData,
  payload,
  url,
  dependencies = [],
  conditions = true,
  page = 1,
  limit,
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

  // Request func
  const makeRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const method = payload ? "POST" : "GET";
    const data = {
      ...payload,
      limit: limit,
    };

    const config = {
      method,
      url,
      data: method === "POST" ? data : undefined,
      // params: method === "GET" ? data : undefined,
      signal: abortController.signal,
    };

    req({ config });
  };
  const makeRequestRef = useRef(makeRequest);

  // Handle request
  useEffect(() => {
    if (conditions && url) {
      makeRequestRef?.current();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    conditions,
    url,
    page,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...(noRt ? [] : [rt]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...dependencies,
  ]);

  // Handle response
  useEffect(() => {
    if (response) {
      setData(response?.data?.data);
      setPaginationData(response?.data?.pagination);
    }
  }, [response]);

  function retry() {
    makeRequest();
  }

  function loadMore() {
    setLoadingLoadMore(true);

    //TODO http request dan append ke data
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
