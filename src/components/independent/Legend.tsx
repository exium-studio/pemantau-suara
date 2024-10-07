import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Circle, MapPinSimpleArea } from "@phosphor-icons/react";
import { useLightDarkColor } from "../../constant/colors";
import geoJSONLayers from "../../constant/geoJSONLayers";
import { iconSize } from "../../constant/sizes";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

const LegendComponent: React.FC = () => {
  // SX
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onClose, onToggle } = useDisclosure();
  // useBackOnClose("legenda", isOpen, onOpen, onClose);

  const {
    highlightedKecamatanIndex,
    toggleHighlightedKecamatanIndex,
    setHighlightedKecamatanIndex,
  } = useHighlighedKecamatan();

  return (
    <>
      <Box p={4} position={"fixed"} bottom={0} right={0} zIndex={2}>
        <Box
          p={1}
          gap={2}
          borderRadius={12}
          bg={lightDarkColor}
          position={"relative"}
          shadow={"sm"}
          border={"1px solid var(--divider)"}
        >
          {highlightedKecamatanIndex.length > 0 && (
            <Center
              position={"absolute"}
              top={"-4px"}
              right={"0px"}
              bg={"red.400"}
              borderRadius={"full"}
              w={"16px"}
              h={"16px"}
            >
              <Text fontSize={12}>{highlightedKecamatanIndex?.length}</Text>
            </Center>
          )}
          <IconButton
            aria-label="legend button"
            icon={<Icon as={MapPinSimpleArea} fontSize={iconSize} />}
            zIndex={2}
            onClick={onToggle}
            className="btn"
          />
        </Box>
      </Box>

      <FloatingContainer
        maxW={"450px"}
        bottom={"74px"}
        right={isOpen ? "16px" : "-480px"}
      >
        <DisclosureHeader
          title="Legenda"
          disableBackOnClose
          onClose={onClose}
          zIndex={20}
        />

        <CContainer px={5} overflowY={"auto"} className={"scrollY"}>
          <SimpleGrid columns={[2]} gap={2} spacingX={4} w={"100%"}>
            {geoJSONLayers.map((layer, i) => {
              const isHighlighted = highlightedKecamatanIndex.includes(i);

              return (
                <Button
                  key={i}
                  size={"sm"}
                  justifyContent={"start"}
                  className="btn noofline1 legend-btn"
                  onClick={() => toggleHighlightedKecamatanIndex(i)}
                  opacity={
                    highlightedKecamatanIndex.length > 0 && !isHighlighted
                      ? 0.4
                      : 1
                  }
                >
                  <HStack w={"100%"}>
                    <Box
                      w={"8px"}
                      h={"8px"}
                      borderRadius={8}
                      bg={layer.color}
                    />
                    <Text className="noofline1">{layer.name}</Text>
                  </HStack>
                </Button>
              );
            })}
          </SimpleGrid>
        </CContainer>

        <ButtonGroup p={5}>
          <Button
            w={"100%"}
            size={"sm"}
            justifyContent={"start"}
            className="btn-solid noofline1"
            onClick={() => {
              toggleHighlightedKecamatanIndex(-1);
            }}
          >
            <HStack w={"100%"}>
              <Box
                w={"8px"}
                h={"8px"}
                borderRadius={8}
                bg={"white"}
                border={"1px solid #aaa"}
                shadow={"sm"}
              />

              <Text>Dipilih/dilihat</Text>

              {highlightedKecamatanIndex.length > 0 &&
                highlightedKecamatanIndex?.includes(-1) && (
                  <Icon
                    ml={"auto"}
                    as={Circle}
                    weight="fill"
                    color={"red.400"}
                    fontSize={8}
                  />
                )}
            </HStack>
          </Button>

          <Button
            w={"100%"}
            size={"sm"}
            className="btn-solid clicky"
            onClick={() => {
              setHighlightedKecamatanIndex([]);
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
      </FloatingContainer>
    </>
  );
};

export default LegendComponent;
