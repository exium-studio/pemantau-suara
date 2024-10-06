import useRequest from "./useRequest";

interface authParams {
  url: string;
  payload?: any;
}

const useAuth = () => {
  const { req, loading, setLoading, response, setResponse, status, setStatus } =
    useRequest();

  function login({ url, payload }: authParams) {
    const config = {
      url: url,
      method: "post",
      data: payload,
    };
    req({ config: config });
  }

  function logout({ url }: authParams) {
    const config = {
      url: url,
    };
    req({ config });
  }

  return {
    login,
    logout,
    loading,
    setLoading,
    response,
    setResponse,
    status,
    setStatus,
  };
};

export default useAuth;
