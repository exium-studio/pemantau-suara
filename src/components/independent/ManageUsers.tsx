import {
  Box,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "@phosphor-icons/react";
import { useState } from "react";
import { useLightDarkColor } from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import DisclosureHeader from "../dependent/DisclosureHeader";
import SearchComponent from "../dependent/input/SearchComponent";
import UsersTable from "./UsersTable";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";
import AddUserModal from "./AddUserModal";

export default function ManageUsers() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { isOpen, onToggle, onClose } = useDisclosure();

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
          icon={<Icon as={User} fontSize={iconSize} />}
          className="btn"
          onClick={onToggle}
        />
      </Tooltip>

      <FloatingContainer
        maxW={"550px"}
        top={"74px"}
        right={isOpen ? "16px" : "-580px"}
      >
        <DisclosureHeader
          title="Kelola Pengguna"
          disableBackOnClose
          onClose={onClose}
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

          <UsersTable conditions={isOpen} filterConfig={filterConfig} />
        </CContainer>
      </FloatingContainer>
    </>
  );
}
