import { SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useBackOnClose from "../../hooks/useBackOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";

export default function DetailGeoJSONData() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-geojson-data`, isOpen, onOpen, onClose);
  const { detailGeoJSONData } = useDetailGeoJSONData();

  useEffect(() => {
    console.log(detailGeoJSONData);
    if (detailGeoJSONData) {
      onOpen();
    } else {
      onClose();
    }
  }, [detailGeoJSONData, onOpen, onClose]);

  return (
    <CContainer
      p={4}
      maxW={"450px"}
      // h={"100%"}
      position={"absolute"}
      top={"56px"}
      left={isOpen ? 0 : "-500px"}
      transition={"200ms"}
      animation={"ease in"}
      zIndex={2}
    >
      <CContainer
        shadow={"sm"}
        bg={lightDarkColor}
        overflowY={"auto"}
        borderRadius={8}
        pb={5}
        border={"1px solid var(--divider)"}
      >
        <DisclosureHeader
          title="Detail Data"
          textProps={{ fontSize: [16, null, 18] }}
        />

        <CContainer
          overscrollY={"auto"}
          className="scrollY"
          // border={"1px solid red"}
        >
          <SimpleGrid columns={[2]} px={6} gap={4}>
            <CContainer>
              <Text opacity={0.4}>Provinsi</Text>
              <Text>{detailGeoJSONData?.properties?.province}</Text>
            </CContainer>

            <CContainer>
              <Text opacity={0.4}>Kota/Kabupaten</Text>
              <Text>{detailGeoJSONData?.properties?.regency}</Text>
            </CContainer>

            <CContainer>
              <Text opacity={0.4}>Kecamatan</Text>
              <Text>{detailGeoJSONData?.properties?.district}</Text>
            </CContainer>

            <CContainer>
              <Text opacity={0.4}>Kelurahan</Text>
              <Text>{detailGeoJSONData?.properties?.village}</Text>
            </CContainer>
          </SimpleGrid>
        </CContainer>
      </CContainer>
    </CContainer>
  );
}
