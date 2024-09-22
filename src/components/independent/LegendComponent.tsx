import {
  Box,
  Button,
  ButtonGroup,
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
import useBackOnClose from "../../hooks/useBackOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";

const LegendComponent: React.FC = () => {
  const lightDarkColor = useLightDarkColor();

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  useBackOnClose("legenda", isOpen, onOpen, onClose);

  const {
    highlightedKecamatanIndex,
    toggleHighlightedKecamatanIndex,
    setHighlightedKecamatanIndex,
  } = useHighlighedKecamatan();

  return (
    <>
      <HStack p={4} position={"fixed"} bottom={0} right={0} zIndex={2}>
        <HStack
          shadow={"sm"}
          border={"1px solid var(--divider)"}
          p={1}
          gap={2}
          borderRadius={12}
          bg={lightDarkColor}
          position={"relative"}
        >
          {highlightedKecamatanIndex.length > 0 && (
            <Icon
              as={Circle}
              weight="fill"
              color={"red.400"}
              fontSize={8}
              position={"absolute"}
              top={"6px"}
              right={"6px"}
            />
          )}
          <IconButton
            aria-label="legend button"
            icon={
              <Icon as={MapPinSimpleArea} fontSize={iconSize} weight="bold" />
            }
            zIndex={2}
            onClick={onToggle}
            shadow={"sm"}
            className="btn"
          />
        </HStack>
      </HStack>

      <CContainer
        px={4}
        maxW={"450px"}
        maxH={"calc((100vh - 72px - 48px - 16px)/2)"}
        position={"fixed"}
        bottom={"72px"}
        right={isOpen ? 0 : "-450px"}
        transition={"200ms"}
        animation={"ease in"}
        zIndex={2}
        overflowY={"auto"}
        gap={2}
        pointerEvents={"none"}
      >
        <CContainer
          shadow={"sm"}
          border={"1px solid var(--divider)"}
          bg={lightDarkColor}
          borderRadius={12}
          overflowY={"auto"}
          pointerEvents={"auto"}
          transition={"200ms ease-out"}
        >
          <DisclosureHeader
            title="Legenda"
            textProps={{ fontSize: [16, null, 18] }}
            p={5}
            pt={"16px !important"}
            position={"sticky"}
            top={0}
            bg={lightDarkColor}
            zIndex={20}
          />

          <CContainer p={5} pt={0} overflowY={"auto"} className={"scrollY"}>
            <SimpleGrid columns={[2]} gap={2} spacingX={4} w={"100%"}>
              {geoJSONLayers.map((layer, i) => {
                const ok = layer?.name !== "Kota Semarang";
                const isHighlighted = highlightedKecamatanIndex.includes(i);

                return (
                  ok && (
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
                  )
                );
              })}
            </SimpleGrid>

            <ButtonGroup mt={4}>
              <Button
                w={"100%"}
                size={"sm"}
                justifyContent={"start"}
                className="btn noofline1"
              >
                <HStack>
                  <Box
                    w={"8px"}
                    h={"8px"}
                    borderRadius={8}
                    bg={"white"}
                    border={"1px solid #aaa"}
                    shadow={"sm"}
                  />
                  <Text>Dipilih/dilihat</Text>
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
                Clear
              </Button>
            </ButtonGroup>
          </CContainer>
        </CContainer>
      </CContainer>
    </>
  );
};

export default LegendComponent;
