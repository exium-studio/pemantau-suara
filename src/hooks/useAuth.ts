import useRequest from "./useRequest";

interface loginParams {
  url: string;
  payload: any;
  onSuccess?: () => void;
}

const useAuth = () => {
  const { req, loading, response } = useRequest();

  function login({ url, payload, onSuccess }: loginParams) {
    const config = {
      url: url,
      method: "post",
      data: payload,
    };
    req({ config: config });
    if (response) {
      localStorage.setItem("__auth_token", response.data?.token);
      localStorage.setItem("__user_data", response.data?.user);
      if (onSuccess) {
        onSuccess();
      }
    }
  }

  function logout() {
    //TODO fungsi logout
  }

  return { loading, login, logout };
};

export default useAuth;
