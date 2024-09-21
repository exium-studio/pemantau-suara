import useDataState from "../../hooks/useDataState";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
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

  const { error, loading, data, retry } = useDataState<any>({
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
        left: 0,
        zIndex: 2,
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
    {
      th: "Username",
      isSortable: true,
    },
    {
      th: "Role",
      isSortable: true,
    },
    {
      th: "Area Kelurahan",
      isSortable: true,
    },
  ];
  const formattedBody = data?.map((item: any, i: number) => ({
    id: item.id,
    columnsFormat: [
      {
        value: i + 1,
        td: i + 1,
        isNumeric: true,
        props: {
          position: "sticky",
          left: 0,
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
            data={{
              id: item?.id,
              nama: item?.nama,
              foto_profil: item?.foto_profil,
            }}
          />
        ),
      },
      {
        value: item?.username,
        td: item?.username,
      },
      {
        value: item?.role?.name,
        td: item?.role?.name,
      },
    ],
  }));

  return (
    <CustomTableContainer>
      <CustomTable
        formattedHeader={formattedHeader}
        formattedBody={formattedBody}
      />
    </CustomTableContainer>
  );
}
