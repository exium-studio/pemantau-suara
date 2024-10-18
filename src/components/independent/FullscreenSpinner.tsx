import { CircularProgress, StackProps, Text } from "@chakra-ui/react";
import CContainer from "./wrapper/CContainer";

interface Props extends StackProps {
  label?: string;
}

export default function FullscreenSpinner({ label, ...props }: Props) {
  return (
    <CContainer
      className="fullScreenSpinner"
      w={"100vw"}
      h={"100vh"}
      justify={"center"}
      align={"center"}
      bg={"blackAlpha.500"}
      backdropFilter={"blur(5px)"}
      transition={"200ms"}
      gap={4}
      p={8}
      {...props}
    >
      <CircularProgress
        isIndeterminate
        color="p.500"
        trackColor="transparent"
        thickness={"8px"}
        mx={"auto"}
        size={"40px"}
      />
      <Text textAlign={"center"} color={"white"}>
        {label}
      </Text>
    </CContainer>
  );
}
