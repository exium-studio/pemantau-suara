import { Box, useColorMode } from "@chakra-ui/react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Map, MapRef, Marker } from "react-map-gl";
import useSearchAddress from "../../global/useSearchAddress";
import LayerHoveredAndClicked from "../independent/mapLayer/LayerHoveredAndClicked";
import LayerKecamaatanSemarang from "../independent/mapLayer/LayerKecamaatanSemarang";

interface Props {
  geoJSONData: any;
  latitude: number;
  longitude: number;
  zoom: number;
  markerLat?: number;
  markerLng?: number;
  style?: CSSProperties;
}

export default function MapboxMap({
  geoJSONData,
  latitude,
  longitude,
  zoom,
  markerLat,
  markerLng,
  style,
}: Props) {
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

  return (
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
                borderRadius={"full"}
              />
            </Marker>
          )}

          {/* Layer all geoJSON data */}
          <LayerKecamaatanSemarang geoJSONData={geoJSONData} />

          {/* Hovered & clicked layers */}
          <LayerHoveredAndClicked mapRef={mapRef} geoJSONData={geoJSONData} />
        </>
      )}
    </Map>
  );
}
