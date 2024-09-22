import { Box, useColorMode } from "@chakra-ui/react";
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

  // Handle render map component
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState("");
  const [viewState, setViewState] = useState({ latitude, longitude, zoom });
  const mapRef = useRef<MapRef>(null);

  // Handle change style depend on dark mode
  useEffect(() => {
    setMapStyle(
      colorMode === "dark"
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11"
    );
  }, [colorMode]);

  // Fetch all geoJSON data
  const [geojsonData, setGeojsonData] = useState<any[]>([]);
  useEffect(() => {
    const fetchGeoJSONData = async () => {
      try {
        const data = await Promise.all(
          geoJSONLayers.map((layer) =>
            fetch(layer.geojson).then((res) => res.json())
          )
        );
        setGeojsonData(data);
      } catch (err) {
        console.error("Error loading GeoJSON files:", err);
      }
    };
    fetchGeoJSONData();
  }, []);

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
  }, [geojsonData, handleLayerClick, onMouseMove]);

  // Handle search selected marker
  const { searchSelected } = useSearchAddress();
  useEffect(() => {
    if (searchSelected && mapRef.current) {
      const map = mapRef.current.getMap();
      if (map && searchSelected.center) {
        map.easeTo({
          center: searchSelected.center,
          zoom: 12,
          duration: 1000,
          easing: (t) => t,
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
            {/* Initial marker */}
            {markerLat && markerLng && (
              <Marker latitude={markerLat} longitude={markerLng} color="red" />
            )}

            {/* Search selected marker */}
            {searchSelected && (
              <Marker
                latitude={searchSelected?.center[1]}
                longitude={searchSelected?.center[0]}
              >
                <Box
                  bg={"p.500"}
                  w={"20px"}
                  h={"20px"}
                  border={"2px solid white"}
                />
              </Marker>
            )}

            {/* Layer all geoJSON data */}
            {geojsonData.map((layer, i) => {
              const isHighlighted = highlightedKecamatanIndex.includes(i);
              const shouldRenderLayer = layer?.name !== "Kota Semarang";

              return (
                shouldRenderLayer && (
                  <Source key={i} type="geojson" data={layer}>
                    <Layer
                      id={`geojson-layer-${i}`}
                      type="fill"
                      paint={{
                        "fill-color": geoJSONLayers[i].color,
                        "fill-opacity":
                          isHighlighted ||
                          highlightedKecamatanIndex.length === 0
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
                    "fill-outline-color":
                      colorMode === "dark" ? "#fff" : "#000",
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
        )}
      </Map>
    </div>
  );
};

export default MapboxMap;
