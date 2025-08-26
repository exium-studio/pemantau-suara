import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { ClockCounterClockwise, Eye, User } from "@phosphor-icons/react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useManageActivities from "../../global/useManageActivities";
import useManageSaksi from "../../global/useManageSaksi";
import useManageUsers from "../../global/useManageUsers";
import getUserData from "../../lib/getUserData";

const ManageUsers = () => {
  const { manageUsers, toggleManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();
  const { onCloseManageSaksi } = useManageSaksi();

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
          onCloseManageSaksi();
          toggleManageUsers();
        }}
      />
    </Tooltip>
  );
};
const ManageActivities = () => {
  const { manageActivities, toggleManageActivities } = useManageActivities();
  const { onCloseManageUsers } = useManageUsers();
  const { onCloseManageSaksi } = useManageSaksi();

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
          onCloseManageSaksi();
          toggleManageActivities();
        }}
      />
    </Tooltip>
  );
};
const ManageSaksi = () => {
  const { manageSaksi, toggleManageSaksi } = useManageSaksi();
  const { onCloseManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();

  return (
    <Tooltip
      label={"Kelola Saksi"}
      openDelay={500}
      placement="bottom"
      mt={1}
      mr={4}
    >
      <IconButton
        aria-label={"Kelola Pengguna"}
        icon={
          <Icon
            as={Eye}
            fontSize={iconSize}
            weight={manageSaksi ? "bold" : "regular"}
            color={manageSaksi ? "p.500" : ""}
          />
        }
        className="btn"
        onClick={() => {
          onCloseManageUsers();
          onCloseManageActivities();
          toggleManageSaksi();
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

      <ManageSaksi />
    </HStack>
  );
}
