import {
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  ClockCounterClockwise,
  List,
  Moon,
  Stack,
  Sun,
  User,
} from "@phosphor-icons/react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useLayerConfig from "../../global/useLayerConfig";
import useManageUsers from "../../global/useManageUsers";
import useManageActivities from "../../global/useManageActivities";
import getUserData from "../../lib/getUserData";

const ManageUsers = () => {
  const { toggleManageUsers } = useManageUsers();
  const isPenggerak = getUserData()?.role?.id === 3;

  return (
    <MenuItem onClick={toggleManageUsers} isDisabled={isPenggerak}>
      <HStack w={"100%"} justify={"space-between"}>
        <Text>Kelola Pengguna</Text>
        <Icon as={User} fontSize={iconSize} />
      </HStack>
    </MenuItem>
  );
};

const ManageActivities = () => {
  const { toggleManageActivities } = useManageActivities();

  return (
    <MenuItem onClick={toggleManageActivities}>
      <HStack w={"100%"} justify={"space-between"}>
        <Text>Kelola Aktivitas</Text>
        <Icon as={ClockCounterClockwise} fontSize={iconSize} />
      </HStack>
    </MenuItem>
  );
};

const LayerConfig = () => {
  const { toggleLayerConfig } = useLayerConfig();

  return (
    <MenuItem onClick={toggleLayerConfig}>
      <HStack w={"100%"} justify={"space-between"}>
        <Text>Layer Config</Text>
        <Icon as={Stack} fontSize={iconSize} />
      </HStack>
    </MenuItem>
  );
};

export default function HamburgerMenu() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      shadow={"sm"}
      border={"1px solid var(--divider)"}
      p={1}
      gap={2}
      borderRadius={12}
      bg={lightDarkColor}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<Icon as={List} fontSize={iconSize} />}
          className="btn"
        />

        <MenuList mt={1}>
          <ManageUsers />

          <ManageActivities />

          <MenuDivider />

          <MenuItem onClick={toggleColorMode}>
            <HStack w={"100%"} justify={"space-between"}>
              <Text>{colorMode === "dark" ? "Mode Terang" : "Mode Gelap"}</Text>
              <Icon
                as={colorMode === "dark" ? Sun : Moon}
                fontSize={iconSize}
              />
            </HStack>
          </MenuItem>

          <MenuDivider />

          <LayerConfig />
        </MenuList>
      </Menu>
    </HStack>
  );
}
