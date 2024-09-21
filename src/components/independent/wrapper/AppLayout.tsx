import { HStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { useLightDarkColor } from "../../../constant/colors";
import useSearchMode from "../../../global/useSearchMode";
import MapboxMap from "../../dependent/MapboxMap";
import DetailGeoJSONData from "../DetailGeoJSONData";
import Navs from "../Navs";
import Profile from "../Profile";
import SearchAddress from "../SearchAddress";
import CContainer from "./CContainer";
import useScreenWidth from "../../../hooks/useScreenWidth";

interface AppLayoutProps {
  children?: any;
  activeIndex?: number;
}

export default function AppLayout({ children, activeIndex }: AppLayoutProps) {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { searchMode } = useSearchMode();
  const sw = useScreenWidth();
  const searchModeTerm = searchMode && sw < 700;

  return (
    <CContainer
      position={"relative"}
      gap={0}
      align={"stretch"}
      overflow={"clip"}
    >
      <CContainer justify={"center"} align={"center"}>
        <MapboxMap latitude={-7.02} longitude={110.38} zoom={11} />
      </CContainer>

      {/* Map Overlays */}
      {/* Left */}
      <HStack
        p={4}
        position={"absolute"}
        top={0}
        left={0}
        zIndex={2}
        w={"100%"}
        // border={"1px solid red"}
      >
        <SearchAddress />
      </HStack>

      {/* Right */}
      <HStack
        p={4}
        position={"absolute"}
        top={0}
        right={0}
        zIndex={2}
        visibility={searchModeTerm ? "hidden" : "visible"}
        opacity={searchModeTerm ? 0 : 1}
        // border={"1px solid red"}
      >
        {/* Color Mode */}
        <HStack
          shadow={"sm"}
          border={"1px solid var(--divider)"}
          p={1}
          gap={2}
          borderRadius={8}
          bg={lightDarkColor}
        >
          <ColorModeSwitcher mt={"auto"} className="btn" borderRadius={6} />
        </HStack>

        {/* Navs */}
        <Navs />

        {/* Profile */}
        <Profile />
      </HStack>

      {/* Detail GeoJSON Data */}
      <DetailGeoJSONData />
    </CContainer>
  );
}
