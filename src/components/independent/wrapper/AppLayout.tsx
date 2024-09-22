import { Box, HStack, Tooltip } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { useLightDarkColor } from "../../../constant/colors";
import DashboardMap from "../DashboardMap";
import DetailGeoJSONData from "../DetailGeoJSONData";
import LegendComponent from "../LegendComponent";
import Navs from "../Navs";
import Profile from "../Profile";
import SearchAddress from "../SearchAddress";
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
      overflow={"clip"}
    >
      <CContainer justify={"center"} align={"center"}>
        <DashboardMap />
      </CContainer>

      {/* Map Overlays */}
      {/* Left */}
      <HStack
        p={4}
        position={"fixed"}
        top={0}
        left={0}
        zIndex={3}
        // w={searchMode ? "100%" : ""}
      >
        <SearchAddress />
      </HStack>

      {/* Right */}
      <HStack p={4} position={"fixed"} top={0} right={0} zIndex={2}>
        {/* Color Mode */}
        <HStack
          shadow={"sm"}
          border={"1px solid var(--divider)"}
          p={1}
          gap={2}
          borderRadius={12}
          bg={lightDarkColor}
        >
          <Tooltip label={"Dark Mode"} placement="bottom" mt={1}>
            <Box>
              <ColorModeSwitcher mt={"auto"} className="btn" />
            </Box>
          </Tooltip>
        </HStack>

        {/* Navs */}
        <Navs />

        {/* Profile */}
        <Profile />
      </HStack>

      {/* Detail GeoJSON Data */}
      <DetailGeoJSONData />

      {/* Legend Component */}
      <LegendComponent />
    </CContainer>
  );
}
