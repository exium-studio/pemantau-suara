import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import getAuthToken from "../lib/getAuthToken";
import getUserData from "../lib/getUserData";
import request from "../lib/request";
import useMiddleware from "../global/useMiddleware";
import useFullscreenSpinner from "../global/useFullscreenSpinner";
import useManageUsers from "../global/useManageUsers";
import useManageActivities from "../global/useManageActivities";
import useDetailAktivitasUser from "../global/useDetailAktivitasUser";

const Middleware = () => {
  const authToken = getAuthToken();
  const userData = getUserData();
  const [loading, setLoading] = useState<boolean>(false);
  const { role, setRole } = useMiddleware();

  const { onFullscreenSpinnerOpen, onFullscreenSpinnerClose } =
    useFullscreenSpinner();
  const { onCloseManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();
  const { setDetailAktivitasUser } = useDetailAktivitasUser();

  useEffect(() => {
    if (authToken) {
      setLoading(true);

      request
        .get(
          `/api/pemantau-suara/publik-request/get-users-profile/${userData?.id}`
        )
        .then((r) => {
          if (r.status === 200) {
            setRole(r?.data?.data?.role);
          }
        })
        .catch((e) => {
          console.log(e);
          localStorage.removeItem("__auth_token");
          localStorage.removeItem("__user_data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [authToken, setRole, userData?.id]);

  useEffect(() => {
    if (loading) {
      onCloseManageUsers();
      onCloseManageActivities();
      setDetailAktivitasUser(undefined);
      onFullscreenSpinnerOpen();
    } else {
      onFullscreenSpinnerClose();
    }
  }, [
    loading,
    onFullscreenSpinnerOpen,
    onFullscreenSpinnerClose,
    onCloseManageActivities,
    onCloseManageUsers,
    setDetailAktivitasUser,
  ]);

  if (!authToken || !userData) {
    return <Navigate to="/" replace />;
  }

  return role && <Outlet />;
};

export default Middleware;
