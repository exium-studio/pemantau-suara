import { Button } from "@chakra-ui/react";
import { Interface__TableState } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
import ImageViewModalDisclosure from "../dependent/ImageViewModalDisclosure";
import NooflineText from "../dependent/NooflineText";
import StatusAktivitasBadge from "../dependent/StatusAktivitasBadge";
import NoData from "./feedback/NoData";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CustomTableContainer from "./wrapper/CustomTableContainer";

interface TableProps {
  tableState: Interface__TableState;
}

const TableComponent = ({ tableState }: TableProps) => {
  // Row options

  const formattedHeader = [
    {
      th: "#",
      props: {
        position: "sticky",
        left: 0,
        zIndex: 2,
        w: "50px",
      },
      cProps: {
        borderRight: "1px solid var(--divider2)",
        w: "50px",
      },
    },
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
      th: "Deskripsi",
      isSortable: true,
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
      th: "Foto Aktivitas",
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
  ];
  const formattedBody = tableState?.data?.map((item: any, i: number) => ({
    id: item.id,
    originalData: item,
    columnsFormat: [
      {
        value: i + 1,
        td: i + 1,
        isNumeric: true,
        props: {
          position: "sticky",
          left: 0,
          zIndex: 3,
          w: "50px",
        },
        cProps: {
          borderRight: "1px solid var(--divider2)",
          w: "50px",
        },
      },
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
        value: item?.status_aktivitas,
        td: <StatusAktivitasBadge data={item?.status_aktivitas} w={"200px"} />,
        cProps: {
          justify: "center",
        },
        isNumeric: true,
      },
      {
        value: item?.deskripsi,
        td: <NooflineText data={item?.deskripsi} />,
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
        value: item?.kelurahan?.nama_kelurahan,
        td: item?.kelurahan?.nama_kelurahan,
      },
      {
        value: item?.kelurahan?.kecamatan?.nama_kecamatan,
        td: item?.kelurahan?.kecamatan?.nama_kecamatan,
      },
    ],
  }));

  // Render lateral
  const render = {
    loading: <Skeleton minH={"300px"} flex={1} />,
    error: <Retry retry={tableState.retry} />,
    empty: <NoData />,
    loaded: (
      <>
        <CustomTableContainer minH={"200px !important"}>
          <CustomTable
            formattedHeader={formattedHeader}
            formattedBody={formattedBody}
          />
        </CustomTableContainer>
      </>
    ),
  };

  return (
    <>
      {tableState.loading && render.loading}

      {!tableState.loading && (
        <>
          {tableState.error && render.error}

          {!tableState.error && (
            <>
              {tableState?.data?.length === 0 && render.empty}

              {tableState?.data?.length > 0 && render.loaded}
            </>
          )}
        </>
      )}
    </>
  );
};

interface Props {
  conditions?: boolean;
  filterConfig?: any;
}

export default function ActivitiesTable({ conditions, filterConfig }: Props) {
  const { tableState } = useDataState<any>({
    url: `/api/pemantau-suara/dashboard/management/get-aktivitas`,
    payload: {},
    conditions: conditions,
    dependencies: [],
  });

  return <TableComponent tableState={tableState} />;
}
