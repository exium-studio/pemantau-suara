import { HStack } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import ManageUsers from "./ManageUsers";
import ManageActivities from "./ManageActivities";

export default function Navs() {
  // SX
  const lightDarkColor = useLightDarkColor();

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
      <ManageUsers />

      <ManageActivities />
    </HStack>
  );
}
