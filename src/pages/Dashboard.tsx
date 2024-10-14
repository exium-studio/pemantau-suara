import { Box, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Stack } from "@phosphor-icons/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import DashboardMap from "../components/independent/DashboardMap";
import DetailDatabyKelurahan from "../components/independent/DetailDatabyKelurahan";
import HamburgerMenu from "../components/independent/HamburgerMenu";
import LayerConfigDisclosure from "../components/independent/LayerConfigDisclosure";
import Legend from "../components/independent/Legend";
import Navs from "../components/independent/Navs";
import Profile from "../components/independent/Profile";
import SearchAddress from "../components/independent/SearchAddress";
import CContainer from "../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../constant/colors";
import { iconSize } from "../constant/sizes";
import useSearchMode from "../global/useSearchMode";
import useIsSmScreen from "../hooks/useIsSmScreen";

export default function Dashboard() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { searchMode } = useSearchMode();
  const ss = useIsSmScreen();

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
        {ss && <HamburgerMenu />}

        {!ss && (
          <>
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
              <LayerConfigDisclosure>
                <IconButton
                  aria-label="Layer Config"
                  icon={<Icon as={Stack} fontSize={iconSize} />}
                  className="btn"
                />
              </LayerConfigDisclosure>
            </HStack>
            {/* Navs */}
            <Navs />
          </>
        )}

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
