import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import chartColors from "../../constant/chartColors";
import { useLightDarkColor } from "../../constant/colors";
import useDataKelurahanComparisonMode from "../../global/useDataKelurahanComparisonMode";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";
import useselectedGeoJSONKelurahan from "../../global/useSelectedGeoJSONKelurahan";
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
import StatusAktivitasBadge from "../dependent/StatusAktivitasBadge";
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
      <MenuList minW={"160px"} zIndex={4}>
        <MenuItem
          onClick={() => {
            setJenisData("potensi_suara");
          }}
          color={jenisData === "potensi_suara" ? "p.500" : ""}
        >
          Aktivitas
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
// const ToggleComparisonMode = () => {
//   const { dataKelurahanComparaisonMode, toggleDataKelurahanComparisonMode } =
//     useDataKelurahanComparisonMode();

//   return (
//     <HStack>
//       <Switch
//         isChecked={dataKelurahanComparaisonMode}
//         onChange={toggleDataKelurahanComparisonMode}
//         colorScheme="ap"
//       ></Switch>
//       <Text>Bandingkan</Text>
//     </HStack>
//   );
// };

const AktivitasChart = ({ data, data2 }: any) => {
  // Data Status Aktivitas
  const result = data.reduce(
    (acc: any, item: any) => {
      if (item.id === null) {
        acc[0].total++;
      } else if (item.id === 1) {
        acc[1].total++;
      } else if (item.id === 2) {
        acc[2].total++;
      }
      return acc;
    },
    [
      { status_aktivitas: "Belum Ada Aktivitas", total: 0, color: "#F0F0F0" },
      { status_aktivitas: "Alat Peraga", total: 0, color: "#00CCFF" },
      { status_aktivitas: "Sosialisasi", total: 0, color: "#0C6091" },
    ]
  );
  const labels = result?.map((item: any) => `${item.status_aktivitas}`);
  const colors = result.map((item: any) => item?.color);
  const datasets = [
    {
      customTooltipLabels: result?.map((item: any) => item?.total),
      label: "Nominal (N)",
      data: result?.map((item: any) => item?.total),
      backgroundColor: colors,
      borderWidth: 0,
    },
  ];

  // Data Potensi Suara
  const labels2 = data2?.map((item: any) => `RW ${item.rw}`);
  const colors2 = Array.from({ length: data2?.length }).map(
    (_, i) => chartColors[i % chartColors.length]
  );
  const datasets2 = [
    {
      customTooltipLabels: data2?.map((item: any) => item?.potensi_suara),
      label: "Nominal (N)",
      data: data2?.map((item: any) => item?.potensi_suara),
      backgroundColor: colors2,
      borderWidth: 0,
    },
  ];
  const totalPotensiSuara = data2
    ?.map((item: any) => parseInt(item.potensi_suara, 10))
    .reduce((acc: any, val: any) => acc + val, 0);

  return (
    <>
      <CContainer
        border={"1px solid var(--divider3)"}
        borderRadius={8}
        flex={0}
        gap={6}
        p={5}
        mb={4}
      >
        <Text fontSize={18} fontWeight={500} textAlign={"center"}>
          Status Aktivitas
        </Text>

        <VStack flex={"1 0 0"} position={"relative"}>
          <VStack zIndex={2} w={"100%"} className="doughnutChartContainer">
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
              Total RW
            </Text>
            <Text fontSize={30} fontWeight={600} lineHeight={1.2}>
              {formatNumber(data?.length)}
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
          {result?.map((item: any, i: number) => (
            <Tooltip key={i} label={formatNumber(item?.total)}>
              <HStack cursor={"default"}>
                <Box
                  w={"8px"}
                  h={"8px"}
                  bg={colors[i]}
                  borderRadius={"full"}
                  border={"1px solid var(--divider3)"}
                />
                <Text fontSize={"sm"} opacity={0.6}>
                  {`${item?.status_aktivitas}`}
                </Text>
              </HStack>
            </Tooltip>
          ))}
        </Wrap>

        <SimpleGrid columns={3} gap={2} mt={4}>
          {data?.map((item: any, i: number) => (
            <Center
              bg={`#${item?.color}`}
              color={item?.id === 3 ? "white" : "dark"}
              borderRadius={6}
              p={2}
            >{`RW ${i + 1}`}</Center>
          ))}
        </SimpleGrid>
      </CContainer>

      {/* <CContainer
        border={"1px solid var(--divider3)"}
        borderRadius={8}
        flex={0}
        gap={6}
        p={5}
        mb={4}
      >
        <SimpleGrid columns={3} gap={4}>
          {data?.map((item: any, i: number) => (
            <Center
              bg={`#${item?.color}`}
              color={item?.id === null ? "black" : "white"}
            >{`RW ${i + 1}`}</Center>
          ))}
        </SimpleGrid>
      </CContainer> */}

      <CContainer
        border={"1px solid var(--divider3)"}
        borderRadius={8}
        flex={0}
        gap={6}
        p={5}
        mb={4}
      >
        <Text fontSize={18} fontWeight={500} textAlign={"center"}>
          Potensi Suara
        </Text>

        <VStack flex={"1 0 0"} position={"relative"}>
          <VStack zIndex={2} w={"100%"} className="doughnutChartContainer">
            <ChartDoughnut
              labels={labels2}
              datasets={datasets2}
              cutout={"70"}
            />
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
            <Text fontSize={30} fontWeight={600} lineHeight={1.2}>
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
          {data2?.map((item: any, i: number) => (
            <Tooltip key={i} label={formatNumber(item?.potensi_suara)}>
              <HStack cursor={"default"}>
                <Box
                  w={"8px"}
                  h={"8px"}
                  bg={colors2[i]}
                  borderRadius={"full"}
                  border={"1px solid var(--divider3)"}
                />
                <Text fontSize={"sm"} opacity={0.6}>
                  {`RW ${item?.rw}`}
                </Text>
              </HStack>
            </Tooltip>
          ))}
        </Wrap>
      </CContainer>
    </>
  );
};
const AktivitasTable = ({ dataStates }: any) => {
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
      th: "Status Aktivitas",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Potensi Suara",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "RW",
      isSortable: true,
      isNumeric: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Kelurahan/Kecamatan",
      isSortable: true,
    },
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
          value: item?.status_aktivitas?.label,
          td: (
            <StatusAktivitasBadge
              data={item?.status_aktivitas?.id}
              w={"120px"}
            />
          ),
          cProps: {
            justify: "center",
          },
          isNumeric: true,
        },
        {
          value: item?.potensi_suara,
          td: formatNumber(item?.potensi_suara),
          cProps: {
            justify: "center",
          },
        },
        {
          value: item?.rw,
          td: item?.rw,
          cProps: {
            justify: "center",
          },
        },
        {
          value: `${item?.kelurahan?.nama_kelurahan}, ${item?.kelurahan?.kecamatan?.nama_kecamatan}`,
          td: `${item?.kelurahan?.nama_kelurahan}, ${item?.kelurahan?.kecamatan?.nama_kecamatan}`,
        },
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
      <CContainer
        border={"1px solid var(--divider3)"}
        borderRadius={8}
        flex={0}
        gap={6}
        p={5}
        mb={4}
      >
        <Text fontSize={18} fontWeight={500} textAlign={"center"}>
          Perolehan Suara KPU
        </Text>

        <VStack flex={"1 0 0"} position={"relative"}>
          <VStack zIndex={2} w={"100%"} className="doughnutChartContainer">
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
            <Tooltip
              key={i}
              label={`Total Suara ${formatNumber(item?.jumlah_suara)}`}
            >
              <HStack cursor={"default"}>
                <Box
                  w={"8px"}
                  h={"8px"}
                  bg={colors[i]}
                  borderRadius={"full"}
                  border={"1px solid var(--divider3)"}
                />
                <Text fontSize={"sm"} opacity={0.6}>
                  {item?.partai?.nama}
                </Text>
              </HStack>
            </Tooltip>
          ))}
        </Wrap>

        <HStack mb={2} ml={2} justify={"center"}>
          <Text fontSize={"sm"}>{upcomingTotalTPS}</Text>
          <Text fontSize={"sm"} opacity={0.4}>
            Total TPS yang akan datang
          </Text>
        </HStack>
      </CContainer>
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
      title: "Aktivitas",
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
      // tahun: [new Date().getFullYear()],
      tahun: [2024],
    },
    conditions: isOpen,
    dependencies: [kodeKelurahan],
  });

  // Render lateral
  const render = {
    loading: (
      <CContainer px={5} gap={4} {...props}>
        <Skeleton minH={"300px"} flex={1} />
      </CContainer>
    ),
    error: <Retry retry={dataStates.retry} />,
    empty: <NoData />,
    loaded: (
      <CContainer px={5} {...props}>
        {jenisData === "potensi_suara" && (
          <>
            <AktivitasChart
              data={dataStates?.data?.chart}
              data2={dataStates?.data?.chart_2}
            />
            <AktivitasTable dataStates={dataStates} />
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
      overflowY={"auto"}
      overflowX={"clip"}
      className="scrollY"
    >
      {/* Jenis Data & Tahun */}
      <Wrap px={5} mb={2} align={"center"} justify={"space-between"}>
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
  const { selectedGeoJSONKelurahan, setSelectedGeoJSONKelurahan } =
    useselectedGeoJSONKelurahan();
  const kodeKelurahan =
    selectedGeoJSONKelurahan?.geoJSON?.properties?.village_code;
  const { dataKelurahanComparaisonMode } = useDataKelurahanComparisonMode();
  const { removeFromHighlightedKecamatanIndex } = useHighlighedKecamatan();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightDarkColor = useLightDarkColor();
  const [gridColumns, setGridColumns] = useState<number>(1);
  const sw = useScreenWidth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mengelola perubahan gridColumns dengan debounce
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setGridColumns(dataKelurahanComparaisonMode ? 2 : 1);
    }, 200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dataKelurahanComparaisonMode]);

  // Mengelola perubahan buka tutup berdasarkan kelurahan yang dipilih
  useEffect(() => {
    selectedGeoJSONKelurahan ? onOpen() : onClose();
  }, [selectedGeoJSONKelurahan, onOpen, onClose]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSelectedGeoJSONKelurahan(undefined);
      removeFromHighlightedKecamatanIndex(-1);
    }, 200);
  }, [
    onClose,
    setSelectedGeoJSONKelurahan,
    removeFromHighlightedKecamatanIndex,
  ]);

  const geoData = selectedGeoJSONKelurahan?.geoJSON?.properties;

  return (
    <FloatingContainer
      id="DetailDataByKelurahan"
      h="100%"
      maxW={dataKelurahanComparaisonMode ? "900px" : "450px"}
      top="74px"
      left={isOpen ? "16px" : "-1030px"}
      // display={isOpen ? "flex" : "none"}
      transition="200ms"
    >
      <CContainer flex={0} pb={5}>
        <DisclosureHeader
          title={`Kelurahan ${geoData?.village}`}
          textProps={{ fontSize: [16, null, 18] }}
          disableBackOnClose
          onClose={handleClose}
          pt="16px !important"
          position="sticky"
          top={0}
          bg={lightDarkColor}
          pb={0}
        />

        <HStack px={5}>
          <Text opacity={0.6}>{geoData?.district}</Text>
        </HStack>
      </CContainer>

      <CContainer overflowY="auto" className="scrollX" pb={5}>
        <SimpleGrid
          columns={gridColumns}
          flex={1}
          h="100%"
          gap={0}
          overflowX={sw > 900 ? "clip" : "auto"}
          className="noScroll"
          scrollSnapType="x mandatory"
        >
          <DataCard kodeKelurahan={kodeKelurahan} isOpen={isOpen} />

          {dataKelurahanComparaisonMode && gridColumns === 2 && (
            <DataCard kodeKelurahan={kodeKelurahan} isOpen={isOpen} />
          )}
        </SimpleGrid>
      </CContainer>
    </FloatingContainer>
  );
}
