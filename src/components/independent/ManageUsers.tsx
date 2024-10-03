import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "@phosphor-icons/react";
import { iconSize } from "../../constant/sizes";
import FloatingContainer from "./wrapper/FloatingContainer";
import DisclosureHeader from "../dependent/DisclosureHeader";
import { useLightDarkColor } from "../../constant/colors";
import CContainer from "./wrapper/CContainer";
import SearchComponent from "../dependent/input/SearchComponent";
import { useState } from "react";

export default function ManageUsers() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Utils
  const { isOpen, onToggle, onClose } = useDisclosure();

  // Search Config
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Tooltip label={"Kelola Pengguna"} placement="bottom" mt={1}>
        <IconButton
          aria-label={"Kelola Pengguna"}
          icon={<Icon as={User} fontSize={iconSize} />}
          className="btn"
          onClick={onToggle}
        />
      </Tooltip>

      <FloatingContainer
        maxW={"450px"}
        top={"74px"}
        right={isOpen ? "16px" : "-480px"}
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
        <CContainer flex={1} px={5} overflowY={"auto"} className={"scrollY"}>
          <Box
            position={"sticky"}
            top={0}
            bg={lightDarkColor}
            zIndex={20}
            pb={5}
          >
            <SearchComponent
              name="search"
              onChangeSetter={(input) => {
                setSearch(input);
              }}
              inputValue={search}
            />
          </Box>
        </CContainer>
      </FloatingContainer>
    </>
  );
}
