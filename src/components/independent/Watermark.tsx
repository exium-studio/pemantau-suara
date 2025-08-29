import { HStack, Image, Text, Wrap } from "@chakra-ui/react";
import useScreenWidth from "../../hooks/useScreenWidth";
import { useLocation } from "react-router-dom";

export default function Watermark() {
  const sw = useScreenWidth();
  const { pathname } = useLocation();

  return (
    <HStack
      w={"100%"}
      position={"fixed"}
      zIndex={2}
      bottom={4}
      left={"50%"}
      transform={"translateX(-50%)"}
      pointerEvents={"none"}
      justify={sw < 500 && pathname !== "/" ? "start" : "center"}
      px={4}
    >
      <Image src="/asset/favicon.svg" w={"16px"} />

      <Wrap spacingY={0}>
        <Text fontSize={"sm"} whiteSpace={"nowrap"}>
          Powered by{" "}
        </Text>
        <a href="https://exium.id/" target="_blank" rel="noreferrer">
          <Text
            fontSize={"sm"}
            pointerEvents={"auto"}
            _hover={{ color: "p.500" }}
            cursor={"pointer"}
            transition={"200ms"}
            fontWeight={700}
          >
            Exium.id
          </Text>
        </a>
      </Wrap>
    </HStack>
  );
}
