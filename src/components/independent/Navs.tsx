import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useLightDarkColor } from "../../constant/colors";
import navs from "../../constant/navs";
import { iconSize } from "../../constant/sizes";

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
      {navs.map((nav, i) => (
        <Tooltip key={i} label={nav.label} placement="bottom" mt={1}>
          <IconButton
            aria-label={nav.label}
            icon={<Icon as={nav.icon} weight={"bold"} fontSize={iconSize} />}
            className="btn"
          />
        </Tooltip>
      ))}
    </HStack>
  );
}
