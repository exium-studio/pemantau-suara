import { Box, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useManageActivities from "../../global/useManageActivities";
import useManageUsers from "../../global/useManageUsers";
import DisclosureHeader from "../dependent/DisclosureHeader";
import SearchComponent from "../dependent/input/SearchComponent";
import AddActivityModal from "./AddActivityModal";
import UsersTable from "./UsersTable";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

export default function ManageActivities() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { manageActivities, toggleManageActivities, onCloseManageActivities } =
    useManageActivities();
  const { onCloseManageUsers } = useManageUsers();

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });

  return (
    <>
      <Tooltip
        label={"Kelola Aktivitas Penggerak"}
        openDelay={500}
        placement="bottom"
        mt={1}
        mr={4}
      >
        <IconButton
          aria-label={"Kelola Pengguna"}
          icon={
            <Icon
              as={ClockCounterClockwise}
              fontSize={iconSize}
              weight={manageActivities ? "bold" : "regular"}
              color={manageActivities ? "p.500" : ""}
            />
          }
          className="btn"
          onClick={() => {
            onCloseManageUsers();
            toggleManageActivities();
          }}
        />
      </Tooltip>

      <FloatingContainer
        maxW={"550px"}
        top={"74px"}
        right={manageActivities ? "16px" : "-580px"}
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

              <AddActivityModal />
            </HStack>
          </Box>

          <UsersTable
            conditions={manageActivities}
            filterConfig={filterConfig}
          />
        </CContainer>
      </FloatingContainer>
    </>
  );
}
