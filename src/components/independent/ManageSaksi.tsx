import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useManageSaksi from "../../global/useManageSaksi";
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import ExportData from "../dependent/ExportData";
import SearchComponent from "../dependent/input/SearchComponent";
import AddSaksiModal from "./AddSaksiModal";
import SaksiTable from "./SaksiTable";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

export default function ManageSaksi() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const isSaksi = getUserData()?.role?.id === 4;

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

            {isSaksi && (
              <ExportData
                tooltipLabel="Export Saksi"
                url={`/api/pemantau-suara/dashboard/management/export-pengguna`}
                fileName="Pengguna"
                ext="xls"
              />
            )}

            <AddSaksiModal />
          </HStack>
        </Box>

        <SaksiTable conditions={manageSaksi} filterConfig={filterConfig} />
      </CContainer>
    </FloatingContainer>
  );
}
