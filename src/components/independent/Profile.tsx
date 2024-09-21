import { Avatar } from "@chakra-ui/react";
import getUserData from "../../lib/getUserData";

export default function Profile() {
  const userData = getUserData();

  return (
    <Avatar
      src={userData?.foto_profil}
      name={userData?.nama}
      mb={1}
      borderRadius={"full"}
      w={"46px"}
      h={"46px"}
      shadow={"sm"}
    />
  );
}
