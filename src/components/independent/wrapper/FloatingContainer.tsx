import { StackProps } from "@chakra-ui/react";
import { useLightDarkColor } from "../../../constant/colors";
import { fcMaxHeight } from "../../../constant/sizes";
import CContainer from "./CContainer";

interface Props extends StackProps {
  children?: any;
}
export default function FloatingContainer({ children, ...props }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer
      className="floatingContainer"
      maxW={"calc(50% - 32px)"}
      maxH={fcMaxHeight}
      position={"fixed"}
      transition={"200ms"}
      animation={"ease in"}
      zIndex={2}
      overflowY={"auto"}
      shadow={"sm"}
      border={"1px solid var(--divider)"}
      bg={lightDarkColor}
      borderRadius={12}
      {...props}
    >
      {children}
    </CContainer>
  );
}
