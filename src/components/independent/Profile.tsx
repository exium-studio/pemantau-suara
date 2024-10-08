import {
  Avatar,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "@remixicon/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { iconSize } from "../../constant/sizes";
import useFullscreenSpinner from "../../global/useFullscreenSpinner";
import useManageActivities from "../../global/useManageActivities";
import useManageUsers from "../../global/useManageUsers";
import useAuth from "../../hooks/useAuth";
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import RoleBadge from "../dependent/RoleBadge";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";
import useDetailAktivitasUser from "../../global/useDetailAktivitasUser";

const Logout = () => {
  const { onCloseManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();
  const { setDetailAktivitasUser } = useDetailAktivitasUser();

  // Utils
  const { onFullscreenSpinnerOpen, onFullscreenSpinnerClose } =
    useFullscreenSpinner();
  const navigate = useNavigate();
  const { logout, loading, status } = useAuth();
  function onLogout() {
    onFullscreenSpinnerOpen();
    // setLabel("Sedang keluar, harap menunggu, jangan menutup halaman ini");
    logout({ url: `/api/logout` });
  }
  // Handle response
  useEffect(() => {
    if (status === 200) {
      onFullscreenSpinnerClose();
      localStorage.removeItem("__auth_token");
      localStorage.removeItem("__user_data");
      onCloseManageUsers();
      onCloseManageActivities();
      setDetailAktivitasUser(undefined);
      navigate("/");
    }
  }, [
    status,
    navigate,
    onFullscreenSpinnerClose,
    onCloseManageUsers,
    onCloseManageActivities,
    setDetailAktivitasUser,
  ]);

  return (
    <Button
      w={"100%"}
      color={"red.400"}
      className="btn-solid clicky"
      rightIcon={
        <Icon
          as={RiLogoutBoxLine}
          transform={"rotate(180deg)"}
          fontSize={iconSize}
        />
      }
      isLoading={loading}
      onClick={onLogout}
    >
      Logout
    </Button>
  );
};

export default function Profile() {
  // States
  const userData = getUserData();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Avatar
        src={userData?.foto_profil || ""}
        name={userData?.nama}
        mb={1}
        borderRadius={"full"}
        w={"46px"}
        h={"46px"}
        shadow={"sm"}
        cursor={"pointer"}
        onClick={onToggle}
      />

      <FloatingContainer
        maxW={"300px"}
        top={"74px"}
        right={isOpen ? "16px" : "calc(-300px + -16px)"}
      >
        <DisclosureHeader
          title=""
          disableBackOnClose
          onClose={onClose}
          position={"sticky"}
          top={0}
          zIndex={20}
        />

        <CContainer px={5}>
          <Avatar
            src={userData?.foto_profil || ""}
            name={userData?.nama}
            size={"xl"}
            mx={"auto"}
            mt={-10}
            mb={4}
          />
          <Text fontWeight={600} fontSize={18} textAlign={"center"} mb={1}>
            {userData?.nama}
          </Text>

          <HStack justify={"center"}>
            <RoleBadge
              data={userData?.role?.id}
              fontSize={10}
              py={"2px"}
              px={2}
            />
          </HStack>
        </CContainer>

        <ButtonGroup p={5}>
          <Logout />
        </ButtonGroup>
      </FloatingContainer>
    </>
  );
}
