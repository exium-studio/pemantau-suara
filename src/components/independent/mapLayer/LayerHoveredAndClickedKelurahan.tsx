import { Layer, Source } from "react-map-gl";
import useselectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";

export default function LayerHoveredAndClicked() {
  const { selectedGeoJSONKelurahan } = useselectedGeoJSONKelurahan();

  console.log(selectedGeoJSONKelurahan);

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
            features: [selectedGeoJSONKelurahan?.geoJSONData],
          }}
        >
          <Layer
            id="clicked-feature-layer"
            type="fill"
            paint={{
              "fill-color": "#ff0000",
              "fill-opacity": 1,
              "fill-outline-color": "#000000",
            }}
          />
        </Source>
      )}
    </>
  );
}
