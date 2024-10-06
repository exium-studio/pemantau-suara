import useRequest from "./useRequest";

interface authParams {
  url: string;
  payload?: any;
}

const useAuth = () => {
  const { req, loading, response, status } = useRequest();

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

  return { login, logout, loading, response, status };
};

export default useAuth;
