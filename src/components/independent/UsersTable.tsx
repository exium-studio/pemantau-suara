import { Icon, MenuItem, Text } from "@chakra-ui/react";
import { Interface__TableState } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
import NoData from "./feedback/NoData";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CustomTableContainer from "./wrapper/CustomTableContainer";
import UserFormModalDisclosure from "./wrapper/UserFormModalDisclosure";
import { Pencil } from "@phosphor-icons/react";
import { iconSize } from "../../constant/sizes";
import getUserData from "../../lib/getUserData";
import PermissionTooltip from "./wrapper/PermissionTooltip";

interface TableProps {
  tableState: Interface__TableState;
}

const TableComponent = ({ tableState }: TableProps) => {
  const userData = getUserData();

  const isUserSuperAdmin = userData?.role?.id === 1;
  const isUserPenanggungJawab = userData?.role?.id === 2;

  // Row options
  const rowOptions = [
    (rowData: any) => {
      const item = rowData?.originalData;

      const isItemPenanggungJawab = item?.role?.id === 2;
      const isItemPelaksana = item?.role?.id === 3;

      const editPermission =
        (isUserSuperAdmin && isItemPenanggungJawab) ||
        (isUserPenanggungJawab && isItemPelaksana);

      const initialValues = {
        foto_profil: item?.foto_profil,
        nama: item?.nama,
        jenis_kelamin: {
          value: item?.jenis_kelamin,
          label: item?.jenis_kelamin ? "Laki - laki" : "Perempuan",
        },
        nik_ktp: item?.nik_ktp,
        no_hp: item?.no_hp,
        role: {
          value: item?.role?.id,
          label: item?.role?.name,
        },
        kelurahan: item?.kelurahan?.map((kelurahan: any) => ({
          values: kelurahan?.id,
          label: kelurahan?.nama_kelurahan,
          original_data: kelurahan,
        })),
        rw_pelaksana: item?.rw_pelaksana?.map((rw: any) => ({
          value: rw,
          label: rw,
        })),
      };

      return (
        <UserFormModalDisclosure
          id={`edit-user-modal-${rowData?.id}`}
          initialValues={initialValues}
          excludeFields={["tgl_diangkat", "username", "password"]}
        >
          <PermissionTooltip permission={editPermission} placement="left">
            <MenuItem isDisabled={!editPermission}>
              <Text>Edit</Text>
              <Icon as={Pencil} fontSize={iconSize} opacity={0.4} />
            </MenuItem>
          </PermissionTooltip>
        </UserFormModalDisclosure>
      );
    },
  ];

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
      th: "Nama",
      isSortable: true,
      props: {
        // w: "243px",
      },
    },
    {
      th: "Username",
      isSortable: true,
    },
    {
      th: "Role",
      isSortable: true,
    },
    {
      th: "No.Telp",
      isSortable: true,
    },
    {
      th: "NIK",
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
          zIndex: 2,
          w: "50px",
        },
        cProps: {
          borderRight: "1px solid var(--divider2)",
          w: "50px",
        },
      },
      {
        value: item?.nama,
        td: (
          <AvatarUserTableBody
            w={"100%"}
            data={{
              id: item?.id,
              nama: item?.nama,
              foto_profil: item?.foto_profil,
            }}
          />
        ),
        props: {
          zIndex: 1,
        },
      },
      {
        value: item?.username,
        td: item?.username,
      },
      {
        value: item?.role?.name,
        td: item?.role?.name,
      },
      {
        value: item?.no_hp,
        td: item?.no_hp,
      },
      {
        value: item?.nik_ktp,
        td: item?.nik_ktp,
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
            rowOptions={rowOptions}
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

export default function UsersTable({ conditions, filterConfig }: Props) {
  const { tableState } = useDataState<any>({
    url: `/api/pemantau-suara/dashboard/management/get-pengguna`,
    payload: {},
    conditions: conditions,
    dependencies: [],
  });

  return <TableComponent tableState={tableState} />;
}
