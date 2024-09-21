import useDataState from "../../hooks/useDataState";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CustomTableContainer from "./wrapper/CustomTableContainer";

export default function TabelUserByKelurahan() {
  const dummy = [
    {
      id: 1,
      nama: "Reza Himalaya",
      username: "reza.himz",
      foto_profil: "/reza.jpg",
      // password: "jolitos123",
      role: {
        id: 3,
        name: "Pelaksana",
      },
    },
    {
      id: 2,
      nama: "Jolitos Kurniawan",
      username: "jolitos.kurniawan",
      foto_profil: null,
      // password: "jolitos123",
      role: {
        id: 3,
        name: "Pelaksana",
      },
    },
  ];

  const loading = false;
  // TODO api get data user by kelurahan
  const { error, data, retry } = useDataState<any>({
    initialData: dummy,
    url: ``,
    dependencies: [],
  });
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
  const formattedBody = data?.map((item: any, i: number) => ({
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
  }));

  // Render lateral
  const render = {
    loading: <Skeleton minH={"300px"} />,
    error: <Retry retry={retry} />,
    loaded: (
      <>
        <CustomTableContainer>
          <CustomTable
            formattedHeader={formattedHeader}
            formattedBody={formattedBody}
            onRowClick={(rowData) => {
              // alert(JSON.stringify(rowData));
              console.log(rowData);
            }}
          />
        </CustomTableContainer>
      </>
    ),
  };

  return (
    <>
      {loading && render.loading}

      {!loading && (
        <>
          {error && render.error}

          {!error && render.loaded}
        </>
      )}
    </>
  );
}
