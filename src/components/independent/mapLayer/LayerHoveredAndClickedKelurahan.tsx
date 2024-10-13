import { Layer, Source } from "react-map-gl";
import useDetailGeoJSONData from "../../../global/useDetailGeoJSONData";

export default function LayerHoveredAndClicked() {
  const { detailGeoJSONData } = useDetailGeoJSONData();

  console.log(detailGeoJSONData);

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
