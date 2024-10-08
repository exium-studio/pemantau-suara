import {
  Box,
  Button,
  Icon,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LockOpen, Pencil } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import {
  Interface__DataConfig,
  Interface__DataStates,
} from "../../constant/interfaces";
import { iconSize } from "../../constant/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import getUserData from "../../lib/getUserData";
import AvatarUserTableBody from "../dependent/AvatarUserTableBody";
import CustomTable from "../dependent/CustomTable";
import DisclosureHeader from "../dependent/DisclosureHeader";
import RoleBadge from "../dependent/RoleBadge";
import TableFooterConfig from "../dependent/TableFooterConfig";
import NoData from "./feedback/NoData";
import Retry from "./feedback/Retry";
import Skeleton from "./feedback/Skeleton";
import CContainer from "./wrapper/CContainer";
import CustomTableContainer from "./wrapper/CustomTableContainer";
import PermissionTooltip from "./wrapper/PermissionTooltip";
import UserFormModalDisclosure from "./wrapper/UserFormModalDisclosure";
import useRequest from "../../hooks/useRequest";

interface ResetPasswordProps {
  userId: number;
  children?: any;
  data: any;
}
const ResetPasswordConfirmationModalDisclosure = ({
  userId,
  children,
  data,
}: ResetPasswordProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    `reset-password-confirmation-modal-${userId}`,
    isOpen,
    onOpen,
    onClose
  );

  const { req, loading } = useRequest();

  function handleConfirmResetPassword() {
    const config = {
      url: `/api/pemantau-suara/dashboard/credentials/reset-password-pengguna/${userId}`,
    };

    req({ config });
  }

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Reset Password"} />
          </ModalHeader>
          <ModalBody>
            <Text opacity={0.4}>
              Password penguna <b>{data?.nama}</b> akan direset menjadi{" "}
              <b>bocahe_dewe</b>
            </Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              isDisabled={loading}
            >
              Tidak
            </Button>
            <Button
              w={"100%"}
              colorScheme="red"
              className="clicky"
              onClick={handleConfirmResetPassword}
              isLoading={loading}
            >
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface TableProps {
  dataStates: Interface__DataStates;
  dataConfig: Interface__DataConfig;
}

const TableComponent = ({ dataStates, dataConfig }: TableProps) => {
  // console.log(dataStates?.data);

  // States
  const userData = getUserData();
  const isUserSuperAdmin = userData?.role?.id === 1;
  const isUserPenanggungJawab = userData?.role?.id === 2;

  const resetPasswordRowOption = (rowData: any) => {
    const item = rowData?.originalData;

    return (
      <ResetPasswordConfirmationModalDisclosure userId={item.id} data={item}>
        <PermissionTooltip permission={isUserSuperAdmin} placement="left">
          <MenuItem isDisabled={!isUserSuperAdmin}>
            <Text>Reset Password</Text>
            <Icon as={LockOpen} fontSize={iconSize} opacity={0.4} />
          </MenuItem>
        </PermissionTooltip>
      </ResetPasswordConfirmationModalDisclosure>
    );
  };

  // Row options
  const rowOptions = [
    (rowData: any) => {
      const item = rowData?.originalData;

      const isItemPenanggungJawab = item?.role?.id === 2;
      const isItemPelaksana = item?.role?.id === 3;

      const editPermission =
        (isUserSuperAdmin && isItemPenanggungJawab) ||
        (isUserPenanggungJawab && isItemPelaksana);

      const kelurahanList = item?.kelurahan?.map((item: any) => ({
        value: item?.kode_kelurahan,
        label: item?.nama_kelurahan,
        original_data: item?.kelurahan,
      }));

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
        kelurahan: isUserPenanggungJawab
          ? {
              value: item?.kelurahan?.[0].kode_kelurahan,
              label: item?.kelurahan?.[0].nama_kelurahan,
              original_data: item?.kelurahan?.[0],
            }
          : kelurahanList,
        // rw_pelaksana: item?.rw_pelaksana?.map((item: any) => item),
        rw_pelaksana: item?.rw_pelaksana?.map((rw: any) => ({
          value: rw,
          label: rw,
        })),
      };

      return (
        <UserFormModalDisclosure
          id={`edit-user-modal-${rowData?.id}`}
          title="Edit Pengguna"
          submitUrl={`/api/pemantau-suara/dashboard/management/pengguna/${rowData?.id}`}
          submitLabel="Simpan"
          initialValues={initialValues}
          excludeFields={["tgl_diangkat", "username", "password"]}
          method={"patch"}
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
    ...(isUserSuperAdmin ? [resetPasswordRowOption] : []),
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
      cProps: {
        justify: "center",
      },
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
        td: <RoleBadge data={item?.role?.id} w={"160px"} />,
        cProps: {
          justify: "center",
        },
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
    error: <Retry retry={dataStates.retry} />,
    empty: <NoData />,
    loaded: (
      <>
        <CustomTableContainer>
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
      {/* {render.loading} */}
    </>
  );
};

interface Props {
  conditions?: boolean;
  filterConfig?: any;
}

export default function UsersTable({ conditions, filterConfig }: Props) {
  const { dataStates, dataConfig } = useDataState<any>({
    url: `/api/pemantau-suara/dashboard/management/get-pengguna`,
    payload: { search: filterConfig?.search?.split(" ") },
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
    <CContainer id="manage-users-body" overflowY={"auto"}>
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
  );
}
