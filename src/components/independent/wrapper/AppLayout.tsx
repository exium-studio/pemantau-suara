import { Avatar, Icon, IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { useLightDarkColor } from "../../../constant/colors";
import navs from "../../../constant/navs";
import { iconSize } from "../../../constant/sizes";
import MapboxMap from "../../dependent/MapboxMap";
import DetailGeoJSONData from "../DetailGeoJSONData";
import CContainer from "./CContainer";

interface AppLayoutProps {
  children?: any;
  activeIndex?: number;
}

export default function AppLayout({ children, activeIndex }: AppLayoutProps) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer
      position={"relative"}
      gap={0}
      align={"stretch"}
      h={"100vh"}
      overflow={"clip"}
    >
      <VStack
        p={2}
        position={"absolute"}
        top={0}
        left={0}
        zIndex={2}
        h={"100vh"}
        // border={"1px solid red"}
      >
        <Avatar
          // src="/asset/logo.png"
          name="Jolitos Kurniawan"
          mb={1}
          borderRadius={"full"}
          w={"48px"}
          h={"48px"}
        />

        <VStack p={1} gap={1} borderRadius={12} bg={lightDarkColor}>
          {navs.map((nav, i) => (
            <Tooltip key={i} label={nav.label} placement="right">
              <IconButton
                aria-label={nav.label}
                icon={
                  <Icon
                    as={nav.icon}
                    weight={"bold"}
                    fontSize={iconSize}
                    // color={activeIndex === i ? "p.500" : "current"}
                  />
                }
                className="btn"
                // className={activeIndex === i ? "btn-apa" : "btn"}
              />
            </Tooltip>
          ))}
        </VStack>

        <VStack p={1} gap={2} borderRadius={12} bg={lightDarkColor}>
          <ColorModeSwitcher mt={"auto"} className="btn" />
        </VStack>
      </VStack>

      <CContainer justify={"center"} align={"center"}>
        <MapboxMap latitude={-6.98445} longitude={110.408296} zoom={11} />
      </CContainer>

      {/* Detail GeoJSON Data */}
      <DetailGeoJSONData />
    </CContainer>
  );
}
