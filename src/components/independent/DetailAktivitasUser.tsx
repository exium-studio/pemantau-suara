import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailAktivitasUser from "../../global/useDetailAktivitasUser";
import useBackOnClose from "../../hooks/useBackOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";

export default function DetailAktivitasUser() {
  // SX
  const lightDarkColor = useLightDarkColor();
  // const sw = useScreenWidth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-aktivitas-user`, isOpen, onOpen, onClose);
  const { detailAktivitasUser, setDetailAktivitasUser } =
    useDetailAktivitasUser();

  useEffect(() => {
    if (detailAktivitasUser) {
      onOpen();
    } else {
      onClose();
      setDetailAktivitasUser(undefined);
    }
  }, [detailAktivitasUser, setDetailAktivitasUser, onOpen, onClose]);

  return (
    <CContainer
      shadow={"sm"}
      bg={lightDarkColor}
      borderRadius={12}
      overflowY={"auto"}
      // border={"1px solid green"}
    >
      <DisclosureHeader
        title={`Aktivitas `}
        textProps={{ fontSize: [16, null, 18] }}
        onClose={() => {
          setDetailAktivitasUser(undefined);
        }}
        p={5}
        pt={"16px !important"}
        position={"sticky"}
        top={0}
        bg={lightDarkColor}
        zIndex={20}
      />

      <CContainer
        p={5}
        pt={0}
        overflowY={"auto"}
        className={"scrollY"}
        // border={"1px solid red"}
      >
        {/* <TabelUserByKelurahan /> */}
      </CContainer>
    </CContainer>
  );
}
