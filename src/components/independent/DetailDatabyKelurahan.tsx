import {
  Box,
  HStack,
  SimpleGrid,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailAktivitasUser from "../../global/useDetailAktivitasUser";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";
import ChartDoughnut from "../dependent/chart/ChartDoughnut";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";

const Chart = ({ data }: any) => {
  const labels = ["Demokrat", "PDI"];
  const datasets = [
    {
      customTooltipLabels: [data?.demokrat, data?.pdi],
      label: "Nominal (%)",
      data: [data?.demokrat, data?.pdi],
      backgroundColor: ["#FBD38D", "#805AD5"],
      borderWidth: 0,
    },
  ];

  return (
    <VStack flex={"1 1 0"} position={"relative"} my={6}>
      <VStack w={"100%"} className="doughnutChartContainer">
        <ChartDoughnut labels={labels} datasets={datasets} />
      </VStack>

      <Text
        position={"absolute"}
        left={"50%"}
        top={"50%"}
        transform={"translate(-50%, -50%)"}
        fontSize={48}
        opacity={0.6}
      >
        N
      </Text>
    </VStack>
  );
};

interface DetailDataProps extends StackProps {
  openLeft?: string;
}

const DetailData = ({ openLeft, ...props }: DetailDataProps) => {
  // SX
  const lightDarkColor = useLightDarkColor();
  // const sw = useScreenWidth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();

  useEffect(() => {
    if (detailGeoJSONData) {
      onOpen();
    } else {
      onClose();
    }
  }, [detailGeoJSONData, setDetailGeoJSONData, onOpen, onClose]);

  const { removeFromHighlightedKecamatanIndex } = useHighlighedKecamatan();

  return (
    <CContainer
      px={4}
      maxW={"450px"}
      // maxH={"calc((100vh - 74px - 56px - 16px)/2)"}
      maxH={`calc(100vh - (74px * 2))`}
      position={"fixed"}
      top={"74px"}
      left={isOpen ? openLeft || 0 : "-450px"}
      transition={"200ms"}
      animation={"ease in"}
      zIndex={2}
      overflowY={"auto"}
      gap={2}
      pointerEvents={"none"}
      {...props}
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
          title={`Kelurahan ${detailGeoJSONData?.geoJSONData?.properties?.village}`}
          textProps={{ fontSize: [16, null, 18] }}
          disableBackOnClose
          onClose={() => {
            onClose();
            setTimeout(() => {
              setDetailGeoJSONData(undefined);
              removeFromHighlightedKecamatanIndex(-1);
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
          <SimpleGrid columns={[2]} gap={3}>
            <CContainer>
              <Text opacity={0.4}>Kecamatan</Text>
              <HStack>
                <Box
                  w={"8px"}
                  h={"8px"}
                  borderRadius={8}
                  bg={detailGeoJSONData?.layer.color}
                />
                <Text>
                  {detailGeoJSONData?.geoJSONData?.properties?.district}
                </Text>
              </HStack>
            </CContainer>

            <CContainer>
              <Text opacity={0.4}>Total RW</Text>
              <Text>{8}</Text>
            </CContainer>
          </SimpleGrid>

          <Chart />

          {/* <TabelUserByKelurahan dataState={dataState} /> */}
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

const DetailAktivitasUser = () => {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
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
      maxH={"calc(((100vh - 72px - 56px - 16px)/2) - 12px)"}
      position={"fixed"}
      top={
        detailGeoJSONData
          ? "calc(((100vh - 72px - 56px - 16px)/2) + 72px + 12px)"
          : "74px"
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
        transition={"200ms ease-out"}
        // border={"1px solid green"}
      >
        <DisclosureHeader
          title={`Aktivitas ${detailAktivitasUser?.nama}`}
          textProps={{ fontSize: [16, null, 18] }}
          disableBackOnClose
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
          {/* <TabelUserByKelurahan /> */}
        </CContainer>
      </CContainer>
    </CContainer>
  );
};

export default function DetailDatabyKelurahan() {
  return (
    <>
      <DetailData />

      <DetailAktivitasUser />
    </>
  );
}
