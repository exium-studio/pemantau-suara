import { HStack } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import ManageUsers from "./ManageUsers";
import ManageActivities from "./ManageActivities";
import getUserData from "../../lib/getUserData";

export default function Navs() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const userData = getUserData();
  const isUserPenggerak = userData?.role?.id === 3;

  return (
    <HStack
      p={1}
      gap={1}
      borderRadius={12}
      bg={lightDarkColor}
      border={"1px solid var(--divider)"}
      shadow={"sm"}
      transition={"200ms"}
    >
      {!isUserPenggerak && <ManageUsers />}

      <ManageActivities />
    </HStack>
  );
}
