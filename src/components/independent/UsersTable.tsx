import { Interface__TableState } from "../../constant/interfaces";
import useDataState from "../../hooks/useDataState";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
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
    loading: <Skeleton minH={"256px"} flex={1} />,
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

export default function UsersTable({ conditions, filterConfig }: Props) {
  const { tableState } = useDataState<any>({
    url: `/api/pemantau-suara/dashboard/management/get-pengguna`,
    payload: {},
    conditions: conditions,
    dependencies: [],
  });

  return <TableComponent tableState={tableState} />;
}
