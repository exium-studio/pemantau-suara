import { Button, Icon, MenuItem, Text } from "@chakra-ui/react";
import { Pencil } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import {
  Interface__DataConfig,
  Interface__DataStates,
} from "../../constant/interfaces";
import { iconSize } from "../../constant/sizes";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import getUserData from "../../lib/getUserData";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
import EditSaksiModalDisclosure from "../dependent/EditSaksiModalDisclosure";
import ImageViewModalDisclosure from "../dependent/ImageViewModalDisclosure";
import NooflineText from "../dependent/NooflineText";
import StatusAktivitasBadge from "../dependent/StatusAktivitasBadge";
import TableFooterConfig from "../dependent/TableFooterConfig";
import NoData from "./feedback/NoData";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CContainer from "./wrapper/CContainer";
import CustomTableContainer from "./wrapper/CustomTableContainer";
import PermissionTooltip from "./wrapper/PermissionTooltip";

interface TableProps {
  dataStates: Interface__DataStates;
  dataConfig: Interface__DataConfig;
}

const TableComponent = ({ dataStates, dataConfig }: TableProps) => {
  // States
  const userData = getUserData();

  const isUserSuperAdmin = userData?.role?.id === 1;
  const editPermission = isUserSuperAdmin;

  // Row options
  const rowOptions = [
    (rowData: any) => {
      const item = rowData?.originalData;

      const initialValues = {
        tps: item?.tps,
        deskripsi: item?.deskripsi,
        tgl_mulai: new Date(formatDate(item?.tgl_mulai, "iso")),
        tgl_selesai: new Date(formatDate(item?.tgl_selesai, "iso")),
        tempat_aktivitas: item?.tempat_aktivitas,
        foto_aktivitas: item?.foto_aktivitas,
      };

      return (
        <EditSaksiModalDisclosure
          id={`${rowData?.id}`}
          initialValues={initialValues}
        >
          <PermissionTooltip permission={editPermission} placement="left">
            <MenuItem isDisabled={!editPermission}>
              <Text>Edit</Text>
              <Icon as={Pencil} fontSize={iconSize} opacity={0.4} />
            </MenuItem>
          </PermissionTooltip>
        </EditSaksiModalDisclosure>
      );
    },
  ];

  const formattedHeader = [
    {
      th: "#",
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
  const formattedBody = dataStates?.data?.map((item: any, i: number) => ({
    id: item.id,
    originalData: item,
    columnsFormat: [
      {
        value: i + 1,
        td: i + 1 + dataConfig?.limit * (dataConfig?.page - 1),
        isNumeric: true,
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
          <StatusAktivitasBadge data={item?.status_aktivitas?.id} w={"120px"} />
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
        isNumeric: true,
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
  }));

  // Render lateral
  const render = {
    loading: <Skeleton minH={"300px"} flex={1} />,
    error: <Retry retry={dataStates.retry} />,
    empty: <NoData />,
    loaded: (
      <>
        <CustomTableContainer>
          <CustomTable
            formattedHeader={formattedHeader}
            formattedBody={formattedBody}
            rowOptions={editPermission ? rowOptions : undefined}
          />
        </CustomTableContainer>
      </>
    ),
  };

  return (
    <>
      {dataStates.loading && render.loading}

      {!dataStates.loading && (
        <>
          {dataStates.error && render.error}

          {!dataStates.error && (
            <>
              {dataStates?.data?.length === 0 && render.empty}

              {dataStates?.data?.length > 0 && render.loaded}
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

export default function SaksiTable({ conditions, filterConfig }: Props) {
  // States
  const userData = getUserData();
  const allowedKelurahan = userData?.kelurahan?.map(
    (kelurahan: any) => kelurahan?.kode_kelurahan
  );
  const { dataStates, dataConfig } = useDataState<any>({
    url: `/api/pemantau-suara/dashboard/management/get-aktivitas-saksi`,
    payload: {
      search: filterConfig?.search?.split(" "),
      limit: 20,
      kode_kelurahan: allowedKelurahan,
    },
    conditions: conditions,
    dependencies: [filterConfig],
  });
  const dataConfigRef = useRef(dataConfig);

  useEffect(() => {
    if (filterConfig?.search) {
      dataConfigRef.current.setPage(1);
    }
  }, [filterConfig]);

  return (
    <>
      <CContainer id="manage-saksi-body" overflowY={"auto"}>
        <CContainer overflowY={"auto"} className={"scrollY"}>
          <TableComponent dataStates={dataStates} dataConfig={dataConfig} />
        </CContainer>

        <TableFooterConfig
          limitConfig={dataConfig?.limit}
          setLimitConfig={dataConfig?.setLimit}
          pageConfig={dataConfig?.page}
          setPageConfig={dataConfig?.setPage}
          paginationData={dataConfig?.paginationData}
        />
      </CContainer>
    </>
  );
}
