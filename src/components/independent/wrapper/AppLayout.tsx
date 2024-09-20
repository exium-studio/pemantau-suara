import { HStack, Icon, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import navs from "../../../constant/navs";
import { iconSize } from "../../../constant/sizes";
import MapboxMap from "../../dependent/MapboxMap";
import CContainer from "./CContainer";

interface AppLayoutProps {
  children?: any;
  activeNav?: number;
}

export default function AppLayout({ children, activeNav }: AppLayoutProps) {
  // SX

  return (
    <HStack gap={0} align={"stretch"} h={"100vh"} overflow={"clip"}>
      <CContainer p={2} gap={2}>
        <Image src="/asset/logo.png" mb={2} borderRadius={"full"} />

        {navs.map((nav, i) => (
          <Tooltip label={nav.label} placement="right" ml={2}>
            <IconButton
              aria-label={nav.label}
              icon={
                <Icon
                  as={nav.icon}
                  weight={activeNav === i ? "bold" : "regular"}
                  fontSize={iconSize}
                />
              }
              className={activeNav === i ? "btn-apa" : "btn"}
              color={"p.500"}
              as={Link}
              to={nav.link}
            />
          </Tooltip>
        ))}

        <ColorModeSwitcher mt={"auto"} className="btn" color={"p.500"} />
      </CContainer>

      <CContainer position={"relative"} justify={"center"} align={"center"}>
        <MapboxMap latitude={-6.98445} longitude={110.408296} zoom={12} />
      </CContainer>
    </HStack>
  );
}
