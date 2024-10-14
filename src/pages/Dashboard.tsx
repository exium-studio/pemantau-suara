import { Box, HStack, Tooltip } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import DashboardMap from "../components/independent/DashboardMap";
import DetailDatabyKelurahan from "../components/independent/DetailDatabyKelurahan";
import LayerConfig from "../components/independent/LayerConfig";
import Legend from "../components/independent/Legend";
import Navs from "../components/independent/Navs";
import Profile from "../components/independent/Profile";
import SearchAddress from "../components/independent/SearchAddress";
import CContainer from "../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../constant/colors";
import useSearchMode from "../global/useSearchMode";

export default function Dashboard() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { searchMode } = useSearchMode();
  // const sw = useScreenWidth();

  return (
    <CContainer
      position={"relative"}
      gap={0}
      align={"stretch"}
      overflow={"clip"}
    >
      <CContainer justify={"center"} align={"center"} overflow={"clip"}>
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
        w={searchMode ? "100%" : ""}
        maxW={"482px"}
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
          <Tooltip
            label={"Dark Mode"}
            placement="bottom"
            mt={1}
            openDelay={500}
          >
            <Box>
              <ColorModeSwitcher mt={"auto"} className="btn" />
            </Box>
          </Tooltip>
        </HStack>

        {/* Layer Config */}
        <HStack
          shadow={"sm"}
          border={"1px solid var(--divider)"}
          p={1}
          gap={2}
          borderRadius={12}
          bg={lightDarkColor}
        >
          <LayerConfig />
        </HStack>

        {/* Navs */}
        <Navs />

        {/* Profile */}
        <Profile />
      </HStack>

      {/* Detail GeoJSON Data */}
      <DetailDatabyKelurahan />

      {/* Legend Component */}
      <Legend />
    </CContainer>
  );
}
