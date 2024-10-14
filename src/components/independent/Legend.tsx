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
import { MapPinArea } from "@phosphor-icons/react";
import { useLightDarkColor } from "../../constant/colors";
import geoJSONLayers from "../../constant/geoJSONLayers";
import { iconSize } from "../../constant/sizes";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

const LegendComponent: React.FC = () => {
  // SX
  const lightDarkColor = useLightDarkColor();

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
            icon={<Icon as={MapPinArea} fontSize={iconSize} />}
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
            {geoJSONLayers.map((layer, i) => {
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
                      bg={layer.color}
                    />
                    <Text className="noofline1">{layer.name}</Text>
                  </HStack>
                </Button>
              );
            })}
          </SimpleGrid>
        </CContainer>
      </FloatingContainer>
    </>
  );
};

export default LegendComponent;
