import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import CContainer from "./wrapper/CContainer";

export default function DetailGeoJSONData() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();

  useEffect(() => {
    console.log(detailGeoJSONData);
    if (detailGeoJSONData) {
      onOpen();
    }
  }, [detailGeoJSONData, onOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setDetailGeoJSONData(undefined);
      }}
    >
      <DrawerContent bg={"transparent"} p={4}>
        <CContainer bg={lightDarkColor} overflowY={"auto"} borderRadius={12}>
          <DrawerHeader>Detail Data</DrawerHeader>
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
