import {
  Box,
  Button,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useRef } from "react";
import geoJSONLayers from "../../constant/geoJSONLayers";

export default function LegendComponent() {
  // SX
  const bg = useColorModeValue("whiteAlpha.700", "blackAlpha.400");

  const { isOpen, onToggle } = useDisclosure();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <VStack
      mx={"auto"}
      position={"absolute"}
      bottom={
        isOpen ? "8px" : `calc(-${containerRef?.current?.offsetHeight}px)`
      }
      left={"50%"}
      gap={0}
      // transform={
      //   isOpen
      //     ? "translateX(-50%) translateY(0)"
      //     : `translateX(-50%) translateY(calc(${containerRef?.current?.offsetHeight}px + 8px))`
      // }
      transform={"translateX(-50%)"}
      transition={"200ms"}
    >
      <Button
        // size={"sm"}
        rightIcon={<Icon as={isOpen ? CaretDown : CaretUp} />}
        mb={2}
        zIndex={2}
        bg={bg}
        _hover={{ bg: bg }}
        _active={{ bg: bg }}
        onClick={onToggle}
        pr={5}
      >
        Legenda
      </Button>

      <VStack ref={containerRef} gap={2} bg={bg} py={3} px={4} borderRadius={8}>
        <SimpleGrid
          columns={[2, 3, 4, 6]}
          gap={2}
          spacingX={4}
          w={"max-content"}
        >
          {geoJSONLayers.map((layer, i) => (
            <HStack key={i}>
              <Box w={"8px"} h={"8px"} borderRadius={8} bg={layer.color} />
              <Text>{layer.name}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}
