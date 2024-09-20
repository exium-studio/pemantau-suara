import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import CContainer from "./wrapper/CContainer";
import DisclosureHeader from "../dependent/DisclosureHeader";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";

export default function DetailGeoJSONData() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-data-drawer`, isOpen, onOpen, onClose);
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();

  function handleOnClose() {
    backOnClose();
    setDetailGeoJSONData(undefined);
  }

  useEffect(() => {
    console.log(detailGeoJSONData);
    if (detailGeoJSONData) {
      onOpen();
    }
  }, [detailGeoJSONData, onOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={handleOnClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent bg={"transparent"} p={2}>
        <CContainer bg={lightDarkColor} overflowY={"auto"} borderRadius={12}>
          <DrawerHeader p={0}>
            <DisclosureHeader title="Detail Data" />
          </DrawerHeader>
          <DrawerBody overflowY={"auto"} className="scrollY">
            <Text>{detailGeoJSONData?.properties?.province}</Text>
            <Text>{detailGeoJSONData?.properties?.regency}</Text>
            <Text>{detailGeoJSONData?.properties?.district}</Text>
            <Text>{detailGeoJSONData?.properties?.village}</Text>
          </DrawerBody>
        </CContainer>
      </DrawerContent>
    </Drawer>
  );
}
