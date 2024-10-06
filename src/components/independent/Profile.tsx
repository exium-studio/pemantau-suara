import {
  Avatar,
  Center,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import getUserData from "../../lib/getUserData";
import { RiLogoutBoxLine } from "@remixicon/react";
import { iconSize } from "../../constant/sizes";
import useAuth from "../../hooks/useAuth";
import useFullscreenSpinner from "../../global/useFullscreenSpinner";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // States
  const userData = getUserData();

  // Utils
  const { onOpen, onClose, setLabel } = useFullscreenSpinner();
  const navigate = useNavigate();
  const { logout, status } = useAuth();
  function onLogout() {
    onOpen();
    setLabel("Sedang keluar, harap menunggu, jangan menutup halaman ini");
    logout({ url: `/api/logout` });
  }
  // Handle response status
  const prevStatus = useRef<number | null>(null);
  useEffect(() => {
    if (status === 200 && prevStatus.current !== status) {
      prevStatus.current = status;
      onClose();
      localStorage.removeItem("__auth_token");
      localStorage.removeItem("__user_data");
      navigate("/");
    }
  }, [status, navigate, onClose]);

  return (
    <Menu>
      <MenuButton as={Center} cursor={"pointer"} borderRadius={"full"}>
        <Avatar
          src={
            userData?.foto_profil || "/asset/images/defaultProfilePhoto.webp"
          }
          name={userData?.nama}
          mb={1}
          borderRadius={"full"}
          w={"46px"}
          h={"46px"}
          shadow={"sm"}
        />
      </MenuButton>

      <MenuList minW={"160px"} zIndex={999}>
        <MenuItem onClick={onLogout}>
          <HStack justify={"space-between"} w={"100%"} color={"red.400"}>
            <Text>Logout</Text>

            <Icon
              as={RiLogoutBoxLine}
              transform={"rotate(180deg)"}
              fontSize={iconSize}
            />
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
