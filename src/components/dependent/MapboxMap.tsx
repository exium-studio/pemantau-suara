import { useColorMode } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl";
import geoJSONLayers from "../../constant/geoJSONLayers";
import useDetailGeoJSONData from "../../global/useDetailGeoJSONData";
import LegendComponent from "../independent/LegendComponent";
import useSearchAddress from "../../global/useSearchAddress";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  markerLat?: number;
  markerLng?: number;
  style?: CSSProperties;
}

const geojsonLayers = geoJSONLayers;

const MapboxMap: FC<MapProps> = ({
  latitude,
  longitude,
  zoom,
  markerLat,
  markerLng,
  style,
}) => {
  const { colorMode } = useColorMode();
  const [mapStyle, setMapStyle] = useState("");
  const [viewState, setViewState] = useState({ latitude, longitude, zoom });
  const mapRef = useRef<MapRef>(null);
  const [geojsonData, setGeojsonData] = useState<any[]>([]);
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);

  // Handle change style depend on dark mode
  useEffect(() => {
    setMapStyle(
      colorMode === "dark"
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/streets-v12"
    );
  }, [colorMode]);

  // Fetch all geoJSON data
  useEffect(() => {
    Promise.all(
      geojsonLayers.map((layer) =>
        fetch(layer.geojson).then((res) => res.json())
      )
    )
      .then((data) => setGeojsonData(data))
      .catch((err) => console.error("Error loading GeoJSON files:", err));
  }, []);

  // Handle layer onclick, set detail data
  const { setDetailGeoJSONData } = useDetailGeoJSONData();
  const handleLayerClick = useCallback(
    (event: any) => {
      const clickedFeature = event.features[0];
      if (clickedFeature) {
        setDetailGeoJSONData(clickedFeature);
      }
    },
    [setDetailGeoJSONData]
  );
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    geojsonLayers.forEach((_, index) => {
      const layerId = `geojson-layer-${index}`;

      const onMouseMove = (event: any) => {
        const hovered = event.features[0];
        if (hovered) {
          setHoveredFeature(hovered);
        }
      };

      const onMouseLeave = () => {
        setHoveredFeature(null);
      };

      map.on("click", layerId, handleLayerClick);
      map.on("mousemove", layerId, onMouseMove);
      map.on("mouseleave", layerId, onMouseLeave);

      return () => {
        map.off("click", layerId, handleLayerClick);
        map.off("mousemove", layerId, onMouseMove);
        map.off("mouseleave", layerId, onMouseLeave);
      };
    });
  }, [geojsonData, handleLayerClick]);

  // Handle Search
  const { searchAddress } = useSearchAddress();

  return (
    <div style={{ position: "relative" }}>
      <Map
        ref={mapRef}
        {...viewState}
        style={{ width: "100vw", height: "100vh", ...style }}
        mapStyle={mapStyle}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {markerLat && markerLng && (
          <Marker latitude={markerLat} longitude={markerLng} color="red" />
        )}

        {/* Render all geoJSON data */}
        {geojsonData.map((geojson, index) => (
          <Source key={index} type="geojson" data={geojson}>
            <Layer
              id={`geojson-layer-${index}`}
              type="fill"
              paint={{
                "fill-color": geojsonLayers[index].color,
                "fill-opacity": hoveredFeature ? 0.4 : 0.4,
                "fill-outline-color": "#000000",
              }}
            />
          </Source>
        ))}

        {/* Render hovered feaure */}
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
                "fill-outline-color": "#000000",
              }}
            />
          </Source>
        )}
      </Map>

      <LegendComponent />
    </div>
  );
};

export default MapboxMap;
