import { useColorMode } from "@chakra-ui/react";
import { RefObject, useCallback, useEffect, useState } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import geoJSONLayers from "../../../constant/geoJSONLayers";
import useDetailGeoJSONData from "../../../global/useDetailGeoJSONData";
import useHighlighedKecamatan from "../../../global/useHighlighedKecamatan";

interface Props {
  mapRef: RefObject<MapRef>;
  geoJSONData: any;
}

export default function LayerHoveredAndClicked({ mapRef, geoJSONData }: Props) {
  // SX
  const { colorMode } = useColorMode();

  // Handle layer hover, onclick, set detail data
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();
  const { highlightedKecamatanIndex, setHighlightedKecamatanIndex } =
    useHighlighedKecamatan();
  const handleLayerClick = useCallback(
    (layer: any) => (event: any) => {
      const clickedFeature = event.features[0];
      if (clickedFeature) {
        setDetailGeoJSONData({ layer: layer, geoJSONData: clickedFeature });

        if (!highlightedKecamatanIndex?.includes(-1)) {
          // console.log([...highlightedKecamatanIndex, -1]);
          setHighlightedKecamatanIndex([...highlightedKecamatanIndex, -1]);
        }
      }
    },
    [
      setDetailGeoJSONData,
      highlightedKecamatanIndex,
      setHighlightedKecamatanIndex,
    ]
  );
  const onMouseMove = useCallback((event: any) => {
    // const currentHoveredFeature = event.features[0];
    // setHoveredFeature(currentHoveredFeature || null);
  }, []);
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    geoJSONLayers.forEach((layer, index) => {
      const layerId = `geojson-layer-${index}`;

      map.on("click", layerId, handleLayerClick(layer));
      map.on("mousemove", layerId, onMouseMove);
      map.on("mouseleave", layerId, () => setHoveredFeature(null));

      return () => {
        map.off("click", layerId, handleLayerClick(layer));
        map.off("mousemove", layerId, onMouseMove);
        map.off("mouseleave", layerId, () => setHoveredFeature(null));
      };
    });
  }, [mapRef, geoJSONData, handleLayerClick, onMouseMove]);

  return (
    <>
      {/* Layer hovered feature */}
      {hoveredFeature && (
        <Source
          type="geojson"
          data={{ type: "FeatureCollection", features: [hoveredFeature] }}
        >
          <Layer
            id="hovered-feature-layer"
            type="fill"
            paint={{
              "fill-color": "#FFFFFF",
              "fill-opacity": 0.6,
              "fill-outline-color": colorMode === "dark" ? "#fff" : "#000",
            }}
          />
        </Source>
      )}

      {/* Layer clicked feature */}
      {detailGeoJSONData && (
        <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [detailGeoJSONData?.geoJSONData],
          }}
        >
          <Layer
            id="clicked-feature-layer"
            type="fill"
            paint={{
              "fill-color": detailGeoJSONData?.layer?.color,
              "fill-opacity": 1,
              "fill-outline-color": "#000000",
            }}
          />
        </Source>
      )}
    </>
  );
}
