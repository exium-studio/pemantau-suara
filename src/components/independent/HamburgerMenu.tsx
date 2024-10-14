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
import { useLightDarkColor } from "../../constant/colors";
import {
  ClockCounterClockwise,
  List,
  Moon,
  Sun,
  User,
} from "@phosphor-icons/react";
import { iconSize } from "../../constant/sizes";

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
          <MenuItem>
            <HStack w={"100%"} justify={"space-between"}>
              <Text>Kelola Pengguna</Text>
              <Icon as={User} fontSize={iconSize} />
            </HStack>
          </MenuItem>

          <MenuItem>
            <HStack w={"100%"} justify={"space-between"}>
              <Text>Kelola Aktivitas</Text>
              <Icon as={ClockCounterClockwise} fontSize={iconSize} />
            </HStack>
          </MenuItem>

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

          <MenuItem onClick={toggleColorMode}>
            <HStack w={"100%"} justify={"space-between"}>
              <Text>{colorMode === "dark" ? "Mode Terang" : "Mode Gelap"}</Text>
              <Icon
                as={colorMode === "dark" ? Sun : Moon}
                fontSize={iconSize}
              />
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
