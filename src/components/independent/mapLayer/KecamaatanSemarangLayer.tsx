import React from "react";
import useHighlighedKecamatan from "../../../global/useHighlighedKecamatan";
import { Layer, Source } from "react-map-gl";
import geoJSONLayers from "../../../constant/geoJSONLayers";
import { useColorMode } from "@chakra-ui/react";

interface Props {
  geoJSONData: any;
}

export default function KecamaatanSemarangLayer({ geoJSONData }: Props) {
  // SX
  const { colorMode } = useColorMode();

  // Handle highlighted geoJSON kecamatan index
  const { highlightedKecamatanIndex } = useHighlighedKecamatan();

  return (
    <>
      {geoJSONData.map((layer: any, i: number) => {
        const isHighlighted = highlightedKecamatanIndex.includes(i);
        const shouldRenderLayer = layer?.name !== "Kota Semarang's District";

        return (
          shouldRenderLayer && (
            <Source key={i} type="geojson" data={layer}>
              <Layer
                id={`geojson-layer-${i}`}
                type="fill"
                paint={{
                  "fill-color": geoJSONLayers[i].color,
                  "fill-opacity":
                    isHighlighted || highlightedKecamatanIndex.length === 0
                      ? 0.6
                      : 0.1,
                  "fill-outline-color": colorMode === "dark" ? "#333" : "#555",
                }}
              />
            </Source>
          )
        );
      })}
    </>
  );
}
