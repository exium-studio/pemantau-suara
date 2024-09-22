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
import useSearchAddress from "../../global/useSearchAddress";
import useHighlighedKecamatan from "../../global/useHighlighedKecamatan";

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
  // SX
  const { colorMode } = useColorMode();

  const [isMapLoaded, setIsMapLoaded] = useState(false);
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
        : "mapbox://styles/mapbox/light-v11"
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

  // Handle layer hover, onclick, set detail data
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
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    geojsonLayers.forEach((_, index) => {
      const layerId = `geojson-layer-${index}`;

      const onMouseMove = (event: any) => {
        const hoveredFeature = event.features[0];
        if (hoveredFeature) {
          setHoveredFeature(hoveredFeature);
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

  // Handle search selected to maps
  const { searchSelected } = useSearchAddress();
  useEffect(() => {
    if (searchSelected && mapRef.current) {
      const map = mapRef.current.getMap();
      if (map && searchSelected.center) {
        map.easeTo({
          center: searchSelected.center, // Use center coordinates from search data
          zoom: 12, // adjust the zoom level as needed
          duration: 1000, // duration of the easing in milliseconds
          easing: (t) => t, // you can define a custom easing function if needed
        });
      }
    }
  }, [searchSelected]);

  // Handle highlighted geoJSON kecamatan index
  const { highlightedKecamatanIndex } = useHighlighedKecamatan();

  return (
    <div style={{ position: "relative" }}>
      <Map
        ref={mapRef}
        onLoad={() => setIsMapLoaded(true)}
        {...viewState}
        pitch={0}
        style={{ width: "100vw", height: "100vh", ...style }}
        mapStyle={mapStyle}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {isMapLoaded && (
          <>
            {markerLat && markerLng && (
              <Marker latitude={markerLat} longitude={markerLng} color="red" />
            )}

            {/* Layer all geoJSON data */}
            {geojsonData.map((layer, i) => {
              const ok = layer?.name !== "Kota Semarang";
              const isHighlighted = highlightedKecamatanIndex.includes(i);

              return (
                ok && (
                  <Source key={i} type="geojson" data={layer}>
                    <Layer
                      id={`geojson-layer-${i}`}
                      type="fill"
                      paint={{
                        "fill-color": geojsonLayers[i].color,
                        "fill-opacity":
                          isHighlighted ||
                          highlightedKecamatanIndex?.length === 0
                            ? 0.6
                            : 0.1,
                        "fill-outline-color":
                          colorMode === "dark" ? "#333" : "#555",
                      }}
                    />
                  </Source>
                )
              );
            })}

            {/* Layer hovered feaure */}
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
                    "fill-outline-color":
                      colorMode === "dark" ? "#fff" : "#000",
                  }}
                />
              </Source>
            )}

            {/* Layer clicked feaure */}
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
        )}
      </Map>
    </div>
  );
};

export default MapboxMap;
