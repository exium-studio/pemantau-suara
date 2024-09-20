import { color, useColorMode } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { CSSProperties, FC, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";

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
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom,
  });

  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/light-v10");
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === "dark") {
      setMapStyle("mapbox://styles/mapbox/dark-v10");
    } else {
      setMapStyle("mapbox://styles/mapbox/light-v10");
    }
  }, [colorMode]);

  const baseStyle = {
    width: "100vw",
    height: "100vh",
  };

  return (
    <Map
      {...viewState}
      style={{ ...baseStyle, ...style }}
      mapStyle={mapStyle}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} // Ganti dengan token Mapbox Anda
    >
      {/* Menampilkan marker jika koordinat marker disediakan */}
      {markerLat && markerLng && (
        <Marker latitude={markerLat} longitude={markerLng} color="red" />
      )}
    </Map>
  );
};

export default MapboxMap;
