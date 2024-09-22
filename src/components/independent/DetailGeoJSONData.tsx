import { SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailAktivitasUser from "../../global/useDetailAktivitasUser";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useBackOnClose from "../../hooks/useBackOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import TabelUserByKelurahan from "./TabelUserByKelurahan";
import CContainer from "./wrapper/CContainer";

const DetailData = () => {
  // SX
  const lightDarkColor = useLightDarkColor();
  // const sw = useScreenWidth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-geojson-data`, isOpen, onOpen, onClose);
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();

  useEffect(() => {
    if (detailGeoJSONData) {
      onOpen();
    } else {
      onClose();
    }
  }, [detailGeoJSONData, setDetailGeoJSONData, onOpen, onClose]);

  return (
    <CContainer
      px={4}
      maxW={"450px"}
      maxH={"calc((100vh - 72px - 48px - 16px)/2)"}
      position={"fixed"}
      top={"72px"}
      left={isOpen ? 0 : "-450px"}
      transition={"200ms"}
      animation={"ease in"}
      zIndex={2}
      overflowY={"auto"}
      gap={2}
      pointerEvents={"none"}
      // border={"1px solid red"}
    >
      <CContainer
        shadow={"sm"}
        bg={lightDarkColor}
        borderRadius={12}
        overflowY={"auto"}
        pointerEvents={"auto"}
        // transform={isOpen ? "" : `translateX(-450px)`}
        transition={"200ms ease-out"}
        // border={"1px solid green"}
      >
        <DisclosureHeader
          title="Detail Data"
          textProps={{ fontSize: [16, null, 18] }}
          disableBackOnClose
          onClose={() => {
            onClose();
            setTimeout(() => {
              setDetailGeoJSONData(undefined);
            }, 200);
          }}
          p={5}
          pt={"16px !important"}
          position={"sticky"}
          top={0}
          bg={lightDarkColor}
          zIndex={20}
        />

        <CContainer
          p={5}
          pt={0}
          overflowY={"auto"}
          className={"scrollY"}
          // border={"1px solid red"}
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
  );
};

const DetailAktivitasUser = () => {
  // SX
  const lightDarkColor = useLightDarkColor();
  // const sw = useScreenWidth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-aktivitas-user`, isOpen, onOpen, onClose);
  const { detailGeoJSONData } = useDetailGeoJSONData();
  const { detailAktivitasUser, setDetailAktivitasUser } =
    useDetailAktivitasUser();

  useEffect(() => {
    if (detailAktivitasUser) {
      onOpen();
    } else {
      onClose();
    }
  }, [detailAktivitasUser, setDetailAktivitasUser, onOpen, onClose]);

  return (
    <CContainer
      px={4}
      maxW={"450px"}
      maxH={"calc(((100vh - 72px - 48px - 16px)/2) - 8px)"}
      position={"fixed"}
      top={
        detailGeoJSONData
          ? "calc(((100vh - 72px - 48px - 16px)/2) + 72px + 8px)"
          : "72px"
      }
      left={isOpen ? 0 : "-450px"}
      transition={"200ms"}
      animation={"ease in"}
      zIndex={2}
      overflowY={"auto"}
      gap={2}
      pointerEvents={"none"}
      // border={"1px solid red"}
    >
      <CContainer
        shadow={"sm"}
        bg={lightDarkColor}
        borderRadius={12}
        overflowY={"auto"}
        pointerEvents={"auto"}
        // transform={isOpen ? "" : `translateX(-450px)`}
        transition={"200ms ease-out"}
        // border={"1px solid green"}
      >
        <DisclosureHeader
          title={`Aktivitas ${detailAktivitasUser?.nama}`}
          textProps={{ fontSize: [16, null, 18] }}
          onClose={() => {
            setTimeout(() => {
              setDetailAktivitasUser(undefined);
            }, 200);
          }}
          p={5}
          pt={"16px !important"}
          position={"sticky"}
          top={0}
          bg={lightDarkColor}
          zIndex={20}
        />

        <CContainer
          p={5}
          pt={0}
          overflowY={"auto"}
          className={"scrollY"}
          // border={"1px solid red"}
        >
          <TabelUserByKelurahan />
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

export default function DetailGeoJSONData() {
  return (
    <>
      <DetailData />

      <DetailAktivitasUser />
    </>
  );
}
