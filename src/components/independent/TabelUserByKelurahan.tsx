import { Interface__DataState } from "../../constant/interfaces";
import useDetailAktivitasUser from "../../global/useDetailAktivitasUser";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CustomTableContainer from "./wrapper/CustomTableContainer";

interface Props {
  dataState: Interface__DataState;
}

export default function TabelUserByKelurahan({ dataState }: Props) {
  const formattedHeader = [
    {
      th: "#",
      isSortable: true,
      props: {
        position: "sticky",
        left: "2px",
        zIndex: 2,
        w: "40px",
      },
      cProps: {
        borderRight: "1px solid var(--divider2)",
      },
    },
    {
      th: "Nama",
      isSortable: true,
      props: {
        w: "243px",
      },
    },
    // {
    //   th: "Username",
    //   isSortable: true,
    // },
    // {
    //   th: "Role",
    //   isSortable: true,
    // },
    // {
    //   th: "Area Kelurahan",
    //   isSortable: true,
    // },
  ];
  const formattedBody = dataState?.data?.usersList?.map(
    (item: any, i: number) => ({
      id: item.id,
      originalData: item,
      columnsFormat: [
        {
          value: i + 1,
          td: i + 1,
          isNumeric: true,
          props: {
            position: "sticky",
            left: "2px",
            zIndex: 2,
          },
          cProps: {
            borderRight: "1px solid var(--divider2)",
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
        // {
        //   value: item?.username,
        //   td: item?.username,
        // },
        // {
        //   value: item?.role?.name,
        //   td: item?.role?.name,
        // },
      ],
    })
  );

  const { setDetailAktivitasUser } = useDetailAktivitasUser();

  // Render lateral
  const render = {
    loading: <Skeleton minH={"256px"} flex={1} />,
    error: <Retry retry={dataState.retry} />,
    loaded: (
      <>
        <CustomTableContainer minH={"200px !important"}>
          <CustomTable
            formattedHeader={formattedHeader}
            formattedBody={formattedBody}
            onRowClick={(rowData) => {
              // alert(JSON.stringify(rowData));
              // console.log(rowData?.originalData);
              setDetailAktivitasUser(rowData?.originalData);
            }}
          />
        </CustomTableContainer>
      </>
    ),
  };

  return (
    <>
      {dataState.loading && render.loading}

      {!dataState.loading && (
        <>
          {dataState.error && render.error}

          {!dataState.error && render.loaded}
        </>
      )}
    </>
  );
}
