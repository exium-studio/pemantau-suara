import { CircularProgress, Text } from "@chakra-ui/react";
import CContainer from "./wrapper/CContainer";
import useFullScreenSpinner from "../../global/useFullscreenSpinner";

export default function FullscreenSpinner() {
  const { label, isOpen } = useFullScreenSpinner();

  return (
    <CContainer
      className="fullScreenSpinner"
      position={"fixed"}
      top={0}
      left={0}
      zIndex={999999}
      w={"100vw"}
      h={"100vh"}
      justify={"center"}
      align={"center"}
      bg={"blackAlpha.500"}
      backdropFilter={"blur(5px)"}
      visibility={isOpen ? "visible" : "hidden"}
      opacity={isOpen ? 1 : 0}
      transition={"200ms"}
      gap={4}
    >
      <CircularProgress
        isIndeterminate
        color="p.500"
        trackColor="transparent"
        thickness={"8px"}
        mx={"auto"}
        size={"40px"}
      />
      <Text>{label}</Text>
    </CContainer>
  );
}
