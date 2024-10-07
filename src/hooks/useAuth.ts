import useDetailGeoJSONData from "../global/useDetailGeoJSONData";
import useManageActivities from "../global/useManageActivities";
import useManageUsers from "../global/useManageUsers";
import useRequest from "./useRequest";

interface authParams {
  url: string;
  payload?: any;
}

const useAuth = () => {
  const { req, loading, setLoading, response, setResponse, status, setStatus } =
    useRequest();
  const { onCloseManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();
  const { setDetailGeoJSONData } = useDetailGeoJSONData();

  function login({ url, payload }: authParams) {
    const config = {
      url: url,
      method: "post",
      data: payload,
    };
    req({ config: config });
  }

  function logout({ url }: authParams) {
    setDetailGeoJSONData(undefined);
    onCloseManageUsers();
    onCloseManageActivities();
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
