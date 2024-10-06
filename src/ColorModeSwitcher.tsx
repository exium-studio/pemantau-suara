import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Moon, Sun } from "@phosphor-icons/react";
import * as React from "react";
import { iconSize } from "./constant/sizes";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(
    <Icon as={Moon} fontSize={iconSize} />,
    <Icon as={Sun} fontSize={iconSize} />
  );

  return (
    <IconButton
      size="md"
      className="clicky"
      color="current"
      onClick={toggleColorMode}
      icon={SwitchIcon}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
