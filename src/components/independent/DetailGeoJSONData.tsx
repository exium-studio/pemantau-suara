import { Text, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLightDarkColor } from "../../constant/colors";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import useBackOnClose from "../../hooks/useBackOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";

export default function DetailGeoJSONData() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-data-drawer`, isOpen, onOpen, onClose);
  const { detailGeoJSONData } = useDetailGeoJSONData();

  // function handleOnClose() {
  //   backOnClose();
  //   setDetailGeoJSONData(undefined);
  // }

  useEffect(() => {
    console.log(detailGeoJSONData);
    if (detailGeoJSONData) {
      onOpen();
    }
  }, [detailGeoJSONData, onOpen]);

  return (
    <CContainer
      p={4}
      maxW={"450px"}
      // h={"100%"}
      position={"absolute"}
      top={"60px"}
      left={isOpen ? 0 : "-500px"}
      transition={"200ms"}
      animation={"ease in"}
    >
      <CContainer
        shadow={"sm"}
        bg={lightDarkColor}
        overflowY={"auto"}
        borderRadius={12}
        pb={5}
        border={"1px solid var(--divider)"}
      >
        <DisclosureHeader title="Detail Data" />
        <CContainer px={6}>
          <Text>{detailGeoJSONData?.properties?.province}</Text>
          <Text>{detailGeoJSONData?.properties?.regency}</Text>
          <Text>{detailGeoJSONData?.properties?.district}</Text>
          <Text>{detailGeoJSONData?.properties?.village}</Text>
        </CContainer>
      </CContainer>
    </CContainer>
  );
}
