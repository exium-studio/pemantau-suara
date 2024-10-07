import { useColorMode } from "@chakra-ui/react";
import { Layer, Source } from "react-map-gl";
import geoJSONLayers from "../../../constant/geoJSONLayers";
import useHighlighedKecamatan from "../../../global/useHighlighedKecamatan";

interface Props {
  geoJSONData: any;
}

export default function LayerKecamaatanSemarang({ geoJSONData }: Props) {
  // SX
  const { colorMode } = useColorMode();

  // Handle highlighted geoJSON kecamatan index
  const { highlightedKecamatanIndex } = useHighlighedKecamatan();

  return (
    <>
      {geoJSONData.map((layer: any, i: number) => {
        const isHighlighted = highlightedKecamatanIndex.includes(i);

        return (
          <Source key={i} type="geojson" data={layer}>
            <Layer
              id={`geojson-layer-${i}`}
              type="fill"
              paint={{
                "fill-color": geoJSONLayers[i].color,
                "fill-opacity":
                  isHighlighted || highlightedKecamatanIndex.length === 0
                    ? 0.6
                    : 0.2,
                "fill-outline-color": colorMode === "dark" ? "#fff" : "#444",
              }}
            />
          </Source>
        );
      })}
    </>
  );
}
