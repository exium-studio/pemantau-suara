import {
  Button,
  ButtonGroup,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { CaretDown, Circle } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import chartColors from "../../constant/chartColors";
import { useLightDarkColor } from "../../constant/colors";
import useDataKelurahanComparisonMode from "../../global/useDataKelurahanComparisonMode";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";
import useDataState from "../../hooks/useDataState";
import useScreenWidth from "../../hooks/useScreenWidth";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import ChartDoughnut from "../dependent/chart/ChartDoughnut";
import CustomTable from "../dependent/CustomTable";
import DisclosureHeader from "../dependent/DisclosureHeader";
import ImageViewModalDisclosure from "../dependent/ImageViewModalDisclosure";
import NooflineText from "../dependent/NooflineText";
import NoData from "./feedback/NoData";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CContainer from "./wrapper/CContainer";
import CustomTableContainer from "./wrapper/CustomTableContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

const JenisDataMenu = ({ jenisDataProps, jenisData, setJenisData }: any) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        size={"sm"}
        pr={2}
        rightIcon={<Icon as={CaretDown} />}
        className="btn"
      >
        {jenisDataProps[jenisData].title}
      </MenuButton>
      <MenuList minW={"160px"}>
        <MenuItem
          onClick={() => {
            setJenisData("potensi_suara");
          }}
          color={jenisData === "potensi_suara" ? "p.500" : ""}
        >
          Potensi Suara
        </MenuItem>
        <MenuItem
          onClick={() => {
            setJenisData("suara_kpu");
          }}
          color={jenisData === "suara_kpu" ? "p.500" : ""}
        >
          Suara KPU
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
const ToggleComparisonMode = () => {
  const { dataKelurahanComparaisonMode, toggleDataKelurahanComparisonMode } =
    useDataKelurahanComparisonMode();

  return (
    <HStack>
      <Switch
        isChecked={dataKelurahanComparaisonMode}
        onChange={toggleDataKelurahanComparisonMode}
        colorScheme="ap"
      ></Switch>
      <Text>Bandingkan</Text>
    </HStack>
  );
};

const PotensiSuaraChart = ({ data }: any) => {
  const labels = data?.map((item: any) => `RW ${item.rw}`);
  const colors = Array.from({ length: data?.length }).map(
    (_, i) => chartColors[i % chartColors.length]
  );
  const datasets = [
    {
      customTooltipLabels: data?.map((item: any) => item?.potensi_suara),
      label: "Nominal (N)",
      data: data?.map((item: any) => item?.potensi_suara),
      backgroundColor: colors,
      borderWidth: 0,
    },
  ];

  const totalPotensiSuara = data?.reduce(
    (sum: any, item: any) => sum + item.potensi_suara,
    0
  );

  return (
    <CContainer flex={0} gap={6} px={4} mb={6}>
      <VStack flex={"1 0 0"} position={"relative"}>
        <VStack w={"100%"} className="doughnutChartContainer">
          <ChartDoughnut labels={labels} datasets={datasets} cutout={"70"} />
        </VStack>

        <VStack
          position={"absolute"}
          left={"50%"}
          top={"50%"}
          transform={"translate(-50%, -50%)"}
          gap={0}
        >
          <Text textAlign={"center"} opacity={0.6}>
            Total
          </Text>
          <Text fontSize={30} fontWeight={600} lineHeight={1.2} mb={4}>
            {formatNumber(totalPotensiSuara)}
          </Text>
        </VStack>
      </VStack>

      <Wrap
        m={"auto"}
        justify={"center"}
        h={"fit-content"}
        px={2}
        spacingX={4}
        spacingY={1}
      >
        {data?.map((item: any, i: number) => (
          <Tooltip key={i} label={formatNumber(item?.potensi_suara)}>
            <HStack cursor={"default"}>
              <Icon as={Circle} weight="fill" color={colors[i]} fontSize={8} />
              <Text fontSize={"sm"} opacity={0.6}>
                {`RW ${item?.rw}`}
              </Text>
            </HStack>
          </Tooltip>
        ))}
      </Wrap>
    </CContainer>
  );
};
const PotensiSuaraTable = ({ dataStates }: any) => {
  const formattedHeader = [
    // {
    //   th: "#",
    //   props: {
    //     position: "sticky",
    //     left: 0,
    //     zIndex: 3,
    //     w: "50px",
    //   },
    //   cProps: {
    //     borderRight: "1px solid var(--divider2)",
    //     w: "50px",
    //   },
    // },
    {
      th: "Penggerak",
      isSortable: true,
      props: {
        // w: "243px",
      },
    },
    {
      th: "Potensi Suara",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    // {
    //   th: "Status Aktivitas",
    //   isSortable: true,
    //   cProps: {
    //     justify: "center",
    //   },
    // },
    {
      th: "RW",
      isSortable: true,
      isNumeric: true,
      cProps: {
        justify: "center",
      },
    },
    // {
    //   th: "Kelurahan",
    //   isSortable: true,
    // },
    // {
    //   th: "Kecamatan",
    //   isSortable: true,
    // },
    {
      th: "Foto Aktivitas",
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Tanggal Mulai",
      isSortable: true,
    },
    {
      th: "Tanggal Selesai",
      isSortable: true,
    },
    {
      th: "Tempat Aktivitas",
      isSortable: true,
    },
    {
      th: "Deskripsi",
      isSortable: true,
    },
  ];
  const formattedBody = dataStates?.data?.table?.map(
    (item: any, i: number) => ({
      id: item.id,
      originalData: item,
      columnsFormat: [
        // {
        //   value: i + 1,
        //   td: i + 1,
        //   isNumeric: true,
        //   props: {
        //     position: "sticky",
        //     left: 0,
        //     zIndex: 2,
        //     w: "50px",
        //   },
        //   cProps: {
        //     borderRight: "1px solid var(--divider2)",
        //     w: "50px",
        //   },
        // },
        {
          value: item?.pelaksana?.nama,
          td: (
            <AvatarUserTableBody
              w={"100%"}
              data={{
                id: item?.pelaksana?.id,
                nama: item?.pelaksana?.nama,
                foto_profil: item?.pelaksana?.foto_profil,
              }}
            />
          ),
          props: {
            zIndex: 1,
          },
        },
        {
          value: item?.potensi_suara,
          td: formatNumber(item?.potensi_suara),
          cProps: {
            justify: "center",
          },
          isNumeric: true,
        },
        // {
        //   value: item?.status_aktivitas,
        //   td: <StatusAktivitasBadge data={item?.status_aktivitas} w={"200px"} />,
        //   cProps: {
        //     justify: "center",
        //   },
        //   isNumeric: true,
        // },
        {
          value: item?.rw,
          td: item?.rw,
          cProps: {
            justify: "center",
          },
        },
        // {
        //   value: item?.kelurahan?.nama_kelurahan,
        //   td: item?.kelurahan?.nama_kelurahan,
        // },
        // {
        //   value: item?.kelurahan?.kecamatan?.nama_kecamatan,
        //   td: item?.kelurahan?.kecamatan?.nama_kecamatan,
        // },
        {
          value: item?.foto_aktivitas,
          td: (
            <ImageViewModalDisclosure
              id={`img-foto-aktivitas-${item?.id}`}
              src={item?.foto_aktivitas}
            >
              <Button colorScheme="ap" variant={"ghost"}>
                Lihat
              </Button>
            </ImageViewModalDisclosure>
          ),
          cProps: {
            justify: "center",
          },
        },
        {
          value: item?.tgl_mulai,
          td: formatDate(item?.tgl_mulai),
          isDate: true,
        },
        {
          value: item?.tgl_selesai,
          td: formatDate(item?.tgl_selesai),
          isDate: true,
        },
        {
          value: item?.tempat_aktivitas,
          td: item?.tempat_aktivitas,
        },
        {
          value: item?.deskripsi,
          td: <NooflineText data={item?.deskripsi} />,
        },
      ],
    })
  );

  return (
    <CustomTableContainer flex={0} minH="fit-content" maxH={"400px"}>
      <CustomTable
        formattedHeader={formattedHeader}
        formattedBody={formattedBody}
      />
    </CustomTableContainer>
  );
};

const SuaraKPUChart = ({ data, dataStates }: any) => {
  const labels = data?.map((item: any) => `${item.partai?.nama}`);
  const colors = data?.map((item: any) => `#${item.partai?.color}`);
  const datasets = [
    {
      customTooltipLabels: data?.map((item: any) => item?.jumlah_suara),
      label: "Nominal (N)",
      data: data?.map((item: any) => item?.jumlah_suara),
      backgroundColor: colors,
      borderWidth: 0,
    },
  ];

  const totalSuara = data?.reduce(
    (sum: any, item: any) => sum + item.jumlah_suara,
    0
  );

  const upcomingTotalTPS = dataStates?.data?.upcomingTPS?.jumlah_tps;

  return (
    <>
      <CContainer flex={0} gap={6} px={4} mb={6}>
        <VStack flex={"1 0 0"} position={"relative"}>
          <VStack w={"100%"} className="doughnutChartContainer">
            <ChartDoughnut labels={labels} datasets={datasets} cutout={"70"} />
          </VStack>

          <VStack
            position={"absolute"}
            left={"50%"}
            top={"50%"}
            transform={"translate(-50%, -50%)"}
            gap={0}
          >
            <Text textAlign={"center"} opacity={0.6}>
              Total
            </Text>
            <Text fontSize={30} fontWeight={600} lineHeight={1.2} mb={4}>
              {formatNumber(totalSuara)}
            </Text>
          </VStack>
        </VStack>

        <Wrap
          m={"auto"}
          h={"fit-content"}
          justify={"center"}
          // columns={[5]}
          px={2}
          spacingX={4}
          spacingY={1}
        >
          {data?.map((item: any, i: number) => (
            <Tooltip key={i} label={formatNumber(item?.jumlah_suara)}>
              <HStack cursor={"default"}>
                <Icon
                  as={Circle}
                  weight="fill"
                  color={colors[i]}
                  fontSize={8}
                />
                <Text fontSize={"sm"} opacity={0.6}>
                  {item?.partai?.nama}
                </Text>
              </HStack>
            </Tooltip>
          ))}
        </Wrap>
      </CContainer>

      <HStack mb={2} ml={2} justify={"center"}>
        <Text fontSize={"sm"}>{upcomingTotalTPS}</Text>
        <Text fontSize={"sm"} opacity={0.4}>
          Total TPS yang akan datang
        </Text>
      </HStack>
    </>
  );
};
const SuaraKPUTable = ({ dataStates }: any) => {
  const tpsTh = dataStates?.data?.table?.[0]?.tps?.map((tps: any) => ({
    th: `TPS ${tps?.tps}`,
    cProps: {
      justify: "end",
    },
  }));

  const formattedHeader = [
    {
      th: "Partai",
      isSortable: true,
      props: {
        position: "sticky",
        left: "0",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    ...(tpsTh ? tpsTh : []),
  ];
  const formattedBody = dataStates?.data?.table?.map((item: any, i: number) => {
    const tpsTd = item?.tps?.map((tps: any) => ({
      value: tps?.jumlah_suara,
      td: formatNumber(tps?.jumlah_suara),
      cProps: {
        justify: "end",
      },
    }));

    return {
      id: item.id,
      originalData: item,
      columnsFormat: [
        {
          value: item.partai?.nama,
          td: item.partai?.nama,
          props: {
            position: "sticky",
            left: "0",
          },
          cProps: {
            borderRight: "1px solid var(--divider3)",
          },
        },
        ...(tpsTd ? tpsTd : []),
      ],
    };
  });

  return (
    <CustomTableContainer minH="fit-content" maxH={"400px"}>
      <CustomTable
        formattedHeader={formattedHeader}
        formattedBody={formattedBody}
      />
    </CustomTableContainer>
  );
};

const DataCard = ({ kodeKelurahan, isOpen, ...props }: any) => {
  // States
  const jenisDataProps: Record<string, any> = {
    potensi_suara: {
      title: "Potensi Suara",
      url: `/api/pemantau-suara/dashboard/monitoring/potensi-suara`,
    },
    suara_kpu: {
      title: "Suara KPU",
      url: `/api/pemantau-suara/dashboard/monitoring/suara-kpu`,
    },
  };
  const [jenisData, setJenisData] = useState<string>("potensi_suara");
  const { dataStates } = useDataState<any>({
    url: jenisDataProps[jenisData].url,
    payload: {
      kode_kelurahan: [kodeKelurahan],
      tahun: [new Date().getFullYear()],
    },
    conditions: isOpen,
    dependencies: [kodeKelurahan],
  });
  const sw = useScreenWidth();
  const isSmallScreen = sw < 768;

  // Render lateral
  const render = {
    loading: (
      <CContainer px={5} gap={4} {...props}>
        <Skeleton minH={"200px"} flex={1} />
        <Skeleton minH={"300px"} flex={1} />
      </CContainer>
    ),
    error: <Retry retry={dataStates.retry} />,
    empty: <NoData />,
    loaded: (
      <CContainer px={5} {...props}>
        {jenisData === "potensi_suara" && (
          <>
            <PotensiSuaraChart data={dataStates?.data?.chart} />
            <PotensiSuaraTable dataStates={dataStates} />
          </>
        )}

        {jenisData === "suara_kpu" && (
          <>
            <SuaraKPUChart
              data={dataStates?.data?.chart}
              dataStates={dataStates}
            />
            <SuaraKPUTable dataStates={dataStates} />
          </>
        )}
      </CContainer>
    ),
  };

  return (
    <CContainer
      flex={1}
      flexShrink={0}
      scrollSnapAlign={"center"}
      h={"100%"}
      w={"100%"}
      maxW={"450px"}
      minW={isSmallScreen ? "300px" : ""}
      overflowY={"auto"}
      overflowX={"clip"}
      className="scrollY"
      // border={"1px solid yellow"}
    >
      <Wrap px={5} mb={6} align={"center"} justify={"space-between"}>
        <JenisDataMenu
          jenisDataProps={jenisDataProps}
          jenisData={jenisData}
          setJenisData={setJenisData}
        />
        <Text fontWeight={500} mr={4}>
          {new Date().getFullYear()}
        </Text>
      </Wrap>

      {dataStates.loading && render.loading}

      {!dataStates.loading && (
        <>
          {dataStates.error && render.error}

          {!dataStates.error && (
            <>
              {!dataStates?.data && render.empty}

              {dataStates?.data && render.loaded}
            </>
          )}
        </>
      )}
      {/* {render.loading} */}
    </CContainer>
  );
};

export default function DetailDatabyKelurahan() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();
  const kodeKelurahan =
    detailGeoJSONData?.geoJSONData?.properties?.village_code;
  const { dataKelurahanComparaisonMode } = useDataKelurahanComparisonMode();
  const [gridColumns, setGridColumns] = useState<number>(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // Clear the timeout if it exists before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to change gridColumns
    if (dataKelurahanComparaisonMode) {
      timeoutRef.current = setTimeout(() => {
        setGridColumns(2);
      }, 200);
    } else {
      setGridColumns(1);
    }

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dataKelurahanComparaisonMode]);

  // Utils
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (detailGeoJSONData) {
      onOpen();
    } else {
      onClose();
    }
  }, [detailGeoJSONData, setDetailGeoJSONData, onOpen, onClose]);
  const geoData = detailGeoJSONData?.geoJSONData?.properties;
  const layerData = detailGeoJSONData?.layer;
  const { removeFromHighlightedKecamatanIndex } = useHighlighedKecamatan();
  const sw = useScreenWidth();
  const isSmallScreen = sw < 480;

  return (
    <FloatingContainer
      h={"100%"}
      maxW={dataKelurahanComparaisonMode ? "900px" : "450px"}
      top={"74px"}
      left={isOpen ? "16px" : "-1030px"}
      transition={"200ms"}
    >
      <CContainer flex={0} pb={5}>
        <DisclosureHeader
          title={`Kelurahan ${geoData?.village}`}
          textProps={{ fontSize: [16, null, 18] }}
          disableBackOnClose
          onClose={() => {
            onClose();
            setTimeout(() => {
              setDetailGeoJSONData(undefined);
              removeFromHighlightedKecamatanIndex(-1);
            }, 200);
          }}
          pt={"16px !important"}
          position={"sticky"}
          top={0}
          bg={lightDarkColor}
          pb={0}
        />

        <HStack>
          <HStack px={5}>
            <Icon
              as={Circle}
              weight="fill"
              color={layerData?.color}
              fontSize={12}
            />
            <Text opacity={0.6}>{geoData?.district}</Text>
          </HStack>
        </HStack>
      </CContainer>

      {/* Content Body */}
      <CContainer overflowY={"auto"} className="scrollX">
        <SimpleGrid
          columns={gridColumns}
          flex={1}
          h={"100%"}
          gap={0}
          overflowX={sw > 900 ? "clip" : "auto"}
          className="noScroll"
          scrollSnapType={"x mandatory"}
        >
          <DataCard kodeKelurahan={kodeKelurahan} isOpen={isOpen} />

          {dataKelurahanComparaisonMode && gridColumns === 2 && (
            <DataCard
              kodeKelurahan={kodeKelurahan}
              isOpen={isOpen}
              // borderLeft={"1px solid var(--divider3)"}
            />
          )}
        </SimpleGrid>
      </CContainer>

      <ButtonGroup p={5}>
        <ToggleComparisonMode />
      </ButtonGroup>
    </FloatingContainer>
  );
}
