import { SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useBackOnClose from "../../hooks/useBackOnClose";
import useScreenWidth from "../../hooks/useScreenWidth";
import DisclosureHeader from "../dependent/DisclosureHeader";
import TabelUserByKelurahan from "./TabelUserByKelurahan";
import CContainer from "./wrapper/CContainer";

export default function DetailGeoJSONData() {
  // SX
  const lightDarkColor = useLightDarkColor();
  const sw = useScreenWidth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-geojson-data`, isOpen, onOpen, onClose);
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();

  useEffect(() => {
    console.log(detailGeoJSONData);
    if (detailGeoJSONData) {
      onOpen();
    } else {
      onClose();
      setDetailGeoJSONData(undefined);
    }
  }, [detailGeoJSONData, setDetailGeoJSONData, onOpen, onClose]);

  return (
    <CContainer
      px={4}
      maxW={"450px"}
      maxH={sw < 720 ? "450px" : "450px"}
      position={"fixed"}
      top={"72px"}
      left={isOpen ? 0 : "-450px"}
      transition={"200ms"}
      animation={"ease in"}
      zIndex={2}
      overflowY={"auto"}
      // border={"1px solid red"}
    >
      <CContainer
        shadow={"sm"}
        bg={lightDarkColor}
        borderRadius={12}
        overflowY={"auto"}
        // border={"1px solid green"}
      >
        <DisclosureHeader
          title="Detail Data"
          textProps={{ fontSize: [16, null, 18] }}
          onClose={() => {
            setDetailGeoJSONData(undefined);
          }}
          p={5}
          pt={"16px !important"}
          position={"sticky"}
          top={0}
          bg={lightDarkColor}
          zIndex={20}
        />

        <CContainer
          border={"1px solid red"}
          p={5}
          pt={0}
          overflowY={"auto"}
          className="scrollY"
        >
          <SimpleGrid flex={1} columns={[2, null, 2]} gap={3} mb={4}>
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

          <TabelUserByKelurahan />
        </CContainer>
      </CContainer>
    </CContainer>

    // <CContainer
    //   p={4}
    //   maxW={"450px"}
    //   maxH={sw < 720 ? "450px" : "calc(100% - 50px)"}
    //   position={"absolute"}
    //   top={"58px"}
    //   left={isOpen ? 0 : "-450px"}
    //   transition={"200ms"}
    //   animation={"ease in"}
    //   zIndex={2}
    //   overflowY={"auto"}
    // >
    //   <CContainer
    //     shadow={"sm"}
    //     bg={lightDarkColor}
    //     overflowY={"auto"}
    //     borderRadius={12}
    //     border={"1px solid green"}
    //   >
    //     <DisclosureHeader
    //       title="Detail Data"
    //       textProps={{ fontSize: [16, null, 18] }}
    //       onClose={() => {
    //         setDetailGeoJSONData(undefined);
    //       }}
    //       p={5}
    //       pt={"16px !important"}
    //     />

    //     <CContainer
    //       overscrollY={"auto"}
    //       className="scrollY"
    //       px={5}
    //       pb={5}
    //       border={"1px solid red"}
    //       maxH={"calc(416px - 60px)"}
    //       // border={"1px solid red"}
    //     >
    //       <SimpleGrid flex={1} columns={[2, null, 2]} gap={3} mb={4}>
    //         <CContainer>
    //           <Text opacity={0.4}>Provinsi</Text>
    //           <Text>{detailGeoJSONData?.properties?.province}</Text>
    //         </CContainer>

    //         <CContainer>
    //           <Text opacity={0.4}>Kota/Kabupaten</Text>
    //           <Text>{detailGeoJSONData?.properties?.regency}</Text>
    //         </CContainer>

    //         <CContainer>
    //           <Text opacity={0.4}>Kecamatan</Text>
    //           <Text>{detailGeoJSONData?.properties?.district}</Text>
    //         </CContainer>

    //         <CContainer>
    //           <Text opacity={0.4}>Kelurahan</Text>
    //           <Text>{detailGeoJSONData?.properties?.village}</Text>
    //         </CContainer>
    //       </SimpleGrid>

    //       <TabelUserByKelurahan />
    //     </CContainer>
    //   </CContainer>
    // </CContainer>
  );
}
