import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { ClockCounterClockwise, User } from "@phosphor-icons/react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useManageActivities from "../../global/useManageActivities";
import useManageUsers from "../../global/useManageUsers";
import getUserData from "../../lib/getUserData";

const ManageUsers = () => {
  const { manageUsers, toggleManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();

  const isPenggerak = getUserData()?.role?.id === 3;

  return (
    <Tooltip
      label={isPenggerak ? "Tidak ada akses" : "Kelola Pengguna"}
      openDelay={500}
      placement="bottom"
      mt={1}
    >
      <IconButton
        aria-label={"Kelola Pengguna"}
        icon={
          <Icon
            as={User}
            fontSize={iconSize}
            weight={manageUsers ? "bold" : "regular"}
            color={manageUsers ? "p.500" : ""}
          />
        }
        className="btn"
        isDisabled={isPenggerak}
        onClick={() => {
          onCloseManageActivities();
          toggleManageUsers();
        }}
      />
    </Tooltip>
  );
};

const ManageActivities = () => {
  const { onCloseManageUsers } = useManageUsers();
  const { manageActivities, toggleManageActivities } = useManageActivities();

  return (
    <Tooltip
      label={"Kelola Aktivitas"}
      openDelay={500}
      placement="bottom"
      mt={1}
      mr={4}
    >
      <IconButton
        aria-label={"Kelola Pengguna"}
        icon={
          <Icon
            as={ClockCounterClockwise}
            fontSize={iconSize}
            weight={manageActivities ? "bold" : "regular"}
            color={manageActivities ? "p.500" : ""}
          />
        }
        className="btn"
        onClick={() => {
          onCloseManageUsers();
          toggleManageActivities();
        }}
      />
    </Tooltip>
  );
};

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
