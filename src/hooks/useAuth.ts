import useRequest from "./useRequest";

interface authParams {
  url: string;
  payload: any;
}

const useAuth = () => {
  const { req, loading, response } = useRequest();

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
    req({ config: config });
  }

  return { login, logout, loading, response };
};

export default useAuth;
