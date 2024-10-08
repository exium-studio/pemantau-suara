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
      gap={0}
      justify={sw < 500 && pathname !== "/" ? "start" : "center"}
      px={4}
      // border={"1px solid red"}
    >
      <Image src="/asset/logo.png" w={"30px"} />
      <Wrap spacingY={0}>
        <Text fontSize={"sm"} whiteSpace={"nowrap"}>
          Beautifully Crafted by{" "}
        </Text>
        <a href="https://distrostudio.org/" target="_blank" rel="noreferrer">
          <Text
            fontSize={"sm"}
            pointerEvents={"auto"}
            _hover={{ color: "p.500" }}
            cursor={"pointer"}
            transition={"200ms"}
            fontWeight={700}
          >
            Distro Studio
          </Text>
        </a>
      </Wrap>
    </HStack>
  );
}
