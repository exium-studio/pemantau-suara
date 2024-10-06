import { Box, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { User } from "@phosphor-icons/react";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useManageActivities from "../../global/useManageActivities";
import useManageUsers from "../../global/useManageUsers";
import DisclosureHeader from "../dependent/DisclosureHeader";
import SearchComponent from "../dependent/input/SearchComponent";
import AddUserModal from "./AddUserModal";
import UsersTable from "./UsersTable";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

export default function ManageUsers() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { manageUsers, toggleManageUsers, onCloseManageUsers } =
    useManageUsers();
  const { onCloseManageActivities } = useManageActivities();

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });

  return (
    <>
      <Tooltip
        label={"Kelola Pengguna"}
        openDelay={500}
        placement="bottom"
        mt={1}
      >
        <IconButton
          aria-label={"Kelola Pengguna"}
          icon={
            <Icon
              as={User}
              fontSize={iconSize}
              weight={manageUsers ? "bold" : "regular"}
              color={manageUsers ? "p.500" : ""}
            />
          }
          className="btn"
          onClick={() => {
            onCloseManageActivities();
            toggleManageUsers();
          }}
        />
      </Tooltip>

      <FloatingContainer
        maxW={"550px"}
        top={"74px"}
        right={manageUsers ? "16px" : "-580px"}
      >
        <DisclosureHeader
          title="Kelola Pengguna"
          disableBackOnClose
          onClose={onCloseManageUsers}
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

              <AddUserModal />
            </HStack>
          </Box>

          <UsersTable conditions={manageUsers} filterConfig={filterConfig} />
        </CContainer>
      </FloatingContainer>
    </>
  );
}
