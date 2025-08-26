import {
  Box,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Stack } from "@phosphor-icons/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import DashboardMap from "../components/independent/DashboardMap";
import DetailDatabyKelurahan from "../components/independent/DetailDatabyKelurahan";
import HamburgerMenu from "../components/independent/HamburgerMenu";
import LayerConfig from "../components/independent/LayerConfig";
import Legend from "../components/independent/Legend";
import Navs from "../components/independent/Navs";
import Profile from "../components/independent/Profile";
import SearchAddress from "../components/independent/SearchAddress";
import CContainer from "../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../constant/colors";
import { iconSize } from "../constant/sizes";
import useSearchMode from "../global/useSearchMode";
import useIsSmScreen from "../hooks/useIsSmScreen";
import useLayerConfig from "../global/useLayerConfig";
import ManageUsers from "../components/independent/ManageUsers";
import ManageActivities from "../components/independent/ManageActivities";
import ManageSaksi from "../components/independent/ManageSaksi";

const LayerConfigButton = () => {
  const { isDisabledLayerConfig, layerConfig, toggleLayerConfig } =
    useLayerConfig();

  return (
    <Tooltip label={"Opsi Layer"} openDelay={500} mt={1}>
      <IconButton
        aria-label="Layer Config"
        icon={<Icon as={Stack} fontSize={iconSize} />}
        className="btn"
        onClick={toggleLayerConfig}
        color={layerConfig ? "p.500" : ""}
        isDisabled={isDisabledLayerConfig}
      />
    </Tooltip>
  );
};

export default function Dashboard() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { searchMode } = useSearchMode();
  const ss = useIsSmScreen();
  const { colorMode } = useColorMode();

  return (
    <CContainer
      position={"relative"}
      gap={0}
      align={"stretch"}
      overflow={"clip"}
    >
      <CContainer
        w={"100vw"}
        h={"100vh"}
        justify={"center"}
        align={"center"}
        overflow={"clip"}
      >
        <DashboardMap />
      </CContainer>

      {/* Map Overlays */}
      {/* Layer Config */}
      <LayerConfig />

      {/* Manage Users */}
      <ManageUsers />

      {/* Manage Activities */}
      <ManageActivities />

      {/* Manage Saksi */}
      <ManageSaksi />

      {/* Legend Component */}
      <Legend />

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
            {/* Color Mode Button */}
            <HStack
              shadow={"sm"}
              border={"1px solid var(--divider)"}
              p={1}
              gap={2}
              borderRadius={12}
              bg={lightDarkColor}
            >
              <Tooltip
                label={colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                placement="bottom"
                mt={1}
                openDelay={500}
              >
                <Box>
                  <ColorModeSwitcher mt={"auto"} className="btn" />
                </Box>
              </Tooltip>
            </HStack>

            {/* Layer Config Button */}
            <HStack
              shadow={"sm"}
              border={"1px solid var(--divider)"}
              p={1}
              gap={2}
              borderRadius={12}
              bg={lightDarkColor}
            >
              <LayerConfigButton />
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
    </CContainer>
  );
}
