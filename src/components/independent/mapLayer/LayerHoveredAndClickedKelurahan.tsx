import { Layer, Source } from "react-map-gl";
import useselectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";

export default function LayerHoveredAndClicked() {
  const { selectedGeoJSONKelurahan } = useselectedGeoJSONKelurahan();

  return (
    <>
      {/* Layer hovered feature */}
      {/* {hoveredFeature && (
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
      )} */}

      {/* Layer clicked feature */}
      {selectedGeoJSONKelurahan && (
        <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [selectedGeoJSONKelurahan?.geoJSON],
          }}
        >
          <Layer
            id="clicked-feature-layer"
            type="fill"
            paint={{
              "fill-color": selectedGeoJSONKelurahan?.color || "#FFFFFF",
              "fill-opacity": 1,
              "fill-outline-color": "#000000",
            }}
          />
        </Source>
      )}
    </>
  );
}
