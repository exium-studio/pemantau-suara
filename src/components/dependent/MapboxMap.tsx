import "mapbox-gl/dist/mapbox-gl.css";
import { CSSProperties, FC, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import usePanel from "../../global/usePanel";
import { useColorMode } from "@chakra-ui/react";

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
  // const [mapKey, setMapKey] = useState(1);
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom,
    // pitch: 45, // Sudut kemiringan untuk tampilan 3D
    // bearing: -17.6, // Sudut rotasi peta
  });

  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") {
      setMapStyle("mapbox://styles/mapbox/dark-v11");
    } else {
      setMapStyle("mapbox://styles/mapbox/streets-v12");
    }
  }, [colorMode]);

  const [containerW, setContainerW] = useState("100vw");
  const { panel } = usePanel();
  useEffect(() => {
    // console.log(panel);
    if (panel) {
      setTimeout(() => {
        setContainerW("50vw");
      }, 200);
    } else {
      setContainerW("100vw");
    }
    // setMapKey((ps) => ps + 1);
  }, [panel]);

  const baseStyle = {
    width: containerW,
    height: "100vh",
  };

  return (
    <Map
      // key={mapKey}
      {...viewState}
      style={{ ...baseStyle, ...style }}
      mapStyle={mapStyle}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} // Ganti dengan token Mapbox Anda
      // terrain={{ source: "mapbox-dem", exaggeration: 1.5 }} // Menambahkan medan (terrain) untuk tampilan 3D
    >
      {/* Menampilkan marker jika koordinat marker disediakan */}
      {markerLat && markerLng && (
        <Marker latitude={markerLat} longitude={markerLng} color="red" />
      )}
    </Map>
  );
};

export default MapboxMap;
