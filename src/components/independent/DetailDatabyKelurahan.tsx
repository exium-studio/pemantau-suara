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
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { ArrowsLeftRight, CaretDown, Circle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import chartColors from "../../constant/chartColors";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";
import useDataState from "../../hooks/useDataState";
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
    <HStack spacing={6} px={4} mb={6}>
      <VStack flex={"1 1 0"} position={"relative"}>
        <VStack w={"100%"} className="doughnutChartContainer">
          <ChartDoughnut labels={labels} datasets={datasets} cutout={"65"} />
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

      <SimpleGrid columns={2} px={2} spacingX={4} spacingY={1}>
        {data?.map((item: any, i: number) => (
          <HStack key={i}>
            <Icon as={Circle} weight="fill" color={colors[i]} fontSize={8} />
            {/* <Text opacity={0.6} whiteSpace={"nowrap"}>
              RW {item?.rw}
            </Text> */}
            <Text fontSize={"sm"}>{formatNumber(item?.potensi_suara)}</Text>
          </HStack>
        ))}
      </SimpleGrid>
    </HStack>
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
    {
      th: "Kelurahan",
      isSortable: true,
    },
    {
      th: "Kecamatan",
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
        {
          value: item?.kelurahan?.nama_kelurahan,
          td: item?.kelurahan?.nama_kelurahan,
        },
        {
          value: item?.kelurahan?.kecamatan?.nama_kecamatan,
          td: item?.kelurahan?.kecamatan?.nama_kecamatan,
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
    <CustomTableContainer maxH={"calc(100vh - 64px - 80px)"}>
      <CustomTable
        formattedHeader={formattedHeader}
        formattedBody={formattedBody}
        // rowOptions={editPermission ? rowOptions : undefined}
      />
    </CustomTableContainer>
  );
};

const SuaraSuaraKPUChart = ({ data }: any) => {
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

  return (
    <HStack spacing={6} px={4} mb={6}>
      <VStack flex={"1 1 0"} position={"relative"}>
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

      <SimpleGrid columns={2} px={2} spacingX={4} spacingY={1}>
        {data?.map((item: any, i: number) => (
          <HStack key={i}>
            <Icon as={Circle} weight="fill" color={colors[i]} fontSize={8} />
            {/* <Text opacity={0.6} whiteSpace={"nowrap"}>
              RW {item?.rw}
            </Text> */}
            <Text fontSize={"sm"}>{formatNumber(item?.potensi_suara)}</Text>
          </HStack>
        ))}
      </SimpleGrid>
    </HStack>
  );
};
const SuaraKPUTable = ({ dataStates }: any) => {
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
    {
      th: "Kelurahan",
      isSortable: true,
    },
    {
      th: "Kecamatan",
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
        {
          value: item?.kelurahan?.nama_kelurahan,
          td: item?.kelurahan?.nama_kelurahan,
        },
        {
          value: item?.kelurahan?.kecamatan?.nama_kecamatan,
          td: item?.kelurahan?.kecamatan?.nama_kecamatan,
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
    <CustomTableContainer maxH={"calc(100vh - 64px - 80px)"}>
      <CustomTable
        formattedHeader={formattedHeader}
        formattedBody={formattedBody}
        // rowOptions={editPermission ? rowOptions : undefined}
      />
    </CustomTableContainer>
  );
};

const PotensiSuaraDataCard = ({ kodeKelurahan }: any) => {
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
    dependencies: [kodeKelurahan],
  });

  // Render lateral
  const render = {
    loading: (
      <CContainer px={5} gap={4}>
        <Skeleton minH={"200px"} flex={1} />
        <Skeleton minH={"350px"} flex={1} />
      </CContainer>
    ),
    error: <Retry retry={dataStates.retry} />,
    empty: <NoData />,
    loaded: (
      <CContainer px={5}>
        <PotensiSuaraChart data={dataStates?.data?.chart} />
        <PotensiSuaraTable dataStates={dataStates} />
      </CContainer>
    ),
  };

  return (
    <>
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
    </>
  );
};

export default function DetailDatabyKelurahan() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();
  const kodeKelurahan =
    detailGeoJSONData?.geoJSONData?.properties?.village_code;

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

  return (
    <FloatingContainer
      maxW={"450px"}
      top={"74px"}
      left={isOpen ? "16px" : "-480px"}
    >
      <CContainer pb={5}>
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
        <HStack px={5}>
          <Icon
            as={Circle}
            weight="fill"
            color={layerData?.color}
            fontSize={12}
          />
          <Text opacity={0.6}>{geoData?.district}</Text>
        </HStack>
      </CContainer>

      {/* Container */}
      <CContainer overflowY={"auto"} className="scrollY">
        <PotensiSuaraDataCard kodeKelurahan={kodeKelurahan} />
      </CContainer>

      <ButtonGroup p={5}>
        <Button
          leftIcon={<Icon as={ArrowsLeftRight} fontSize={iconSize} />}
          className="btn-solid clicky"
          pl={5}
        >
          Bandingkan
        </Button>
      </ButtonGroup>
    </FloatingContainer>
  );
}
