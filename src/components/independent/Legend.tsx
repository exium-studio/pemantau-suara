import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MapTrifold } from "@phosphor-icons/react";
import {
  partaisLegend,
  statusAktivitasLegend,
  useLightDarkColor,
} from "../../constant/colors";
import { iconSize } from "../../constant/sizes";
import useLayerConfig from "../../global/useLayerConfig";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

const LegendComponent: React.FC = () => {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Globals
  const { layer } = useLayerConfig();
  const legend = (() => {
    switch (layer?.label) {
      case "Aktivitas":
        return statusAktivitasLegend;
      case "Suara KPU":
        return partaisLegend;
      case "Quick Count Suara KPU":
        return partaisLegend;
      default:
        return [];
    }
  })();

  // Utils
  const { isOpen, onClose, onToggle } = useDisclosure();

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
          <IconButton
            aria-label="legend button"
            icon={<Icon as={MapTrifold} fontSize={iconSize} />}
            zIndex={2}
            onClick={onToggle}
            className="btn"
            color={isOpen ? "p.500" : ""}
          />
        </Box>
      </Box>

      <FloatingContainer
        maxW={"450px"}
        bottom={"74px"}
        right={isOpen ? "16px" : "calc(-450px + -30px )"}
      >
        <DisclosureHeader
          title="Legenda"
          disableBackOnClose
          onClose={onClose}
          zIndex={20}
        />

        <CContainer px={5} pb={5} overflowY={"auto"} className={"scrollY"}>
          <SimpleGrid columns={[2]} gap={2} spacingX={4} w={"100%"}>
            {legend.map((item, i) => {
              return (
                <Button
                  key={i}
                  size={"sm"}
                  justifyContent={"start"}
                  className="btn noofline1 legend-btn"
                >
                  <HStack w={"100%"}>
                    <Box
                      w={"8px"}
                      h={"8px"}
                      borderRadius={8}
                      bg={item.color}
                      border={"1px solid var(--divider3)"}
                    />
                    <Text className="noofline1">{item.label}</Text>
                  </HStack>
                </Button>
              );
            })}
          </SimpleGrid>

          <Text mt={6} opacity={0.4} fontSize={"sm"}>
            *Legenda menyesuaikan Layer di Layer Config
          </Text>
        </CContainer>
      </FloatingContainer>
    </>
  );
};

export default LegendComponent;
