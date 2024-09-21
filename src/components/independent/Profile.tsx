import { Avatar } from "@chakra-ui/react";
import getUserData from "../../lib/getUserData";

export default function Profile() {
  const userData = getUserData();

  //TODO ganti fallback srv avatarnya

  return (
    <Avatar
      src={userData?.foto_profil || "/reza.jpg"}
      name={userData?.nama}
      mb={1}
      borderRadius={"full"}
      w={"46px"}
      h={"46px"}
      shadow={"sm"}
    />
  );
}
