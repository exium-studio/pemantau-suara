import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useManageActivities from "../../global/useManageActivities";
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import ExportData from "../dependent/ExportData";
import SearchComponent from "../dependent/input/SearchComponent";
import ActivitiesTable from "./ActivitiesTable";
import AddActivityModal from "./AddActivityModal";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

export default function ManageActivities() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const isPenggerak = getUserData()?.role?.id === 3;

  // Utils
  const { manageActivities, onCloseManageActivities } = useManageActivities();

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });

  return (
    <FloatingContainer
      maxW={"550px"}
      top={"74px"}
      right={manageActivities ? "16px" : "-580px"}
      h={"100%"}
    >
      <DisclosureHeader
        title="Kelola Aktivitas Penggerak"
        disableBackOnClose
        onClose={onCloseManageActivities}
        textProps={{ fontSize: [16, null, 18] }}
        p={5}
        pt={"16px !important"}
        position={"sticky"}
        top={0}
        bg={lightDarkColor}
        zIndex={20}
      />
      <CContainer
        flex={1}
        px={5}
        pb={5}
        overflowY={"auto"}
        className={"scrollY"}
      >
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
            {!isPenggerak && (
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
            )}

            <ExportData
              tooltipLabel="Export Aktivitas"
              url={`/api/pemantau-suara/dashboard/management/export-aktivitas`}
              fileName="Aktivitas"
              ext="xls"
            />

            <AddActivityModal />
          </HStack>
        </Box>

        <ActivitiesTable
          conditions={manageActivities}
          filterConfig={filterConfig}
        />
      </CContainer>
    </FloatingContainer>
  );
}
