import { BoxProps } from "@chakra-ui/react";
import useScreenHeight from "../../../hooks/useScreenHeight";
import CContainer from "./CContainer";

interface Props extends BoxProps {
  children?: any;
  noFooterConfig?: boolean;
  noTopNavs?: boolean;
  customReducer?: number;
  minH?: string;
}

export default function CustomTableContainer({
  children,
  noFooterConfig,
  noTopNavs,
  customReducer,
  minH,
  ...props
}: Props) {
  const sh = useScreenHeight();

  return (
    <CContainer
      className={"tabelContainer scrollX scrollY"}
      overflow={"auto"}
      w={"100%"}
      minH={minH || (sh < 625 ? "400px" : "100%")}
      border={"1px solid var(--divider3)"}
      borderRadius={8}
      {...props}
    >
      {children}
    </CContainer>
  );
}
