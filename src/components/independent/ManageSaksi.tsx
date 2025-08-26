import { Box, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import ExportData from "../dependent/ExportData";
import SearchComponent from "../dependent/input/SearchComponent";
import UsersTable from "./UsersTable";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";
import UserFormModalDisclosure from "./wrapper/UserFormModalDisclosure";
import useManageSaksi from "../../global/useManageSaksi";

export default function ManageSaksi() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const isPenggerak = getUserData()?.role?.id === 3;

  // Utils
  const { manageSaksi, onCloseManageSaksi } = useManageSaksi();

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });

  return (
    <FloatingContainer
      maxW={"550px"}
      top={"74px"}
      right={manageSaksi ? "16px" : "-580px"}
      h={"100%"}
    >
      <DisclosureHeader
        title="Kelola Saksi"
        disableBackOnClose
        onClose={onCloseManageSaksi}
        textProps={{ fontSize: [16, null, 18] }}
        p={5}
        pt={"16px !important"}
        position={"sticky"}
        top={0}
        bg={lightDarkColor}
        zIndex={20}
      />
      <CContainer flex={1} px={5} pb={5} overflowY={"auto"}>
        <Box>
          <HStack
            overflowX={"auto"}
            className="scrollX"
            position={"sticky"}
            top={0}
            bg={lightDarkColor}
            zIndex={20}
            pb={4}
          >
            <SearchComponent
              name="search"
              onChangeSetter={(input) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  search: input,
                }));
              }}
              inputValue={filterConfig.search}
            />

            {!isPenggerak && (
              <ExportData
                tooltipLabel="Export Saksi"
                url={`/api/pemantau-suara/dashboard/management/export-pengguna`}
                fileName="Pengguna"
                ext="xls"
              />
            )}

            <UserFormModalDisclosure
              id="tambah-pengguna"
              title="Tambah Pengguna"
              submitUrl="/api/pemantau-suara/dashboard/management/pengguna"
              submitLabel="Tambahkan"
            >
              <Tooltip label="Tambah Pengguna" openDelay={500} mr={9}>
                <IconButton
                  aria-label="add-user"
                  icon={<Icon as={Plus} fontSize={iconSize} />}
                  colorScheme="ap"
                  className="btn-ap clicky"
                />
              </Tooltip>
            </UserFormModalDisclosure>
          </HStack>
        </Box>

        <UsersTable conditions={manageSaksi} filterConfig={filterConfig} />
      </CContainer>
    </FloatingContainer>
  );
}
