import useRequest from "./useRequest";

interface Props {
  url: string;
  onSuccess?: () => void;
}

const useAuth = ({ url }: Props) => {
  const { req, loading } = useRequest();

  function login(payload: any) {
    const config = {
      url: url,
      method: "post",
      data: payload,
    };
    req({ config: config });
  }

  function logout() {
    //TODO fungsi logout
  }

  return { loading, login, logout };
};

export default useAuth;
