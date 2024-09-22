import { useColorMode } from "@chakra-ui/react";
import { RefObject, useCallback, useEffect, useState } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import geoJSONLayers from "../../../constant/geoJSONLayers";
import useDetailGeoJSONData from "../../../global/useDetailGeoJSONData";

interface Props {
  mapRef: RefObject<MapRef>;
  geoJSONData: any;
}

export default function HoveredAndClickedLayer({ mapRef, geoJSONData }: Props) {
  // SX
  const { colorMode } = useColorMode();

  // Handle layer hover, onclick, set detail data
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const { detailGeoJSONData, setDetailGeoJSONData } = useDetailGeoJSONData();
  const handleLayerClick = useCallback(
    (event: any) => {
      const clickedFeature = event.features[0];
      if (clickedFeature) {
        setDetailGeoJSONData(clickedFeature);
      }
    },
    [setDetailGeoJSONData]
  );
  const onMouseMove = useCallback((event: any) => {
    const hoveredFeature = event.features[0];
    setHoveredFeature(hoveredFeature || null);
  }, []);
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    geoJSONLayers.forEach((_, index) => {
      const layerId = `geojson-layer-${index}`;

      map.on("click", layerId, handleLayerClick);
      map.on("mousemove", layerId, onMouseMove);
      map.on("mouseleave", layerId, () => setHoveredFeature(null));

      return () => {
        map.off("click", layerId, handleLayerClick);
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
            features: [detailGeoJSONData],
          }}
        >
          <Layer
            id="clicked-feature-layer"
            type="fill"
            paint={{
              "fill-color": "#FFFFFF",
              "fill-opacity": 1,
              "fill-outline-color": "#000000",
            }}
          />
        </Source>
      )}
    </>
  );
}
