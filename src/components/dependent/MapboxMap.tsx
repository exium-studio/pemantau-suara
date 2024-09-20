import "mapbox-gl/dist/mapbox-gl.css";
import { CSSProperties, FC, useState } from "react";
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
    pitch: 45, // Sudut kemiringan untuk tampilan 3D
    bearing: -17.6, // Sudut rotasi peta
  });

  const [mapStyle] = useState("mapbox://styles/mapbox/streets-v12");

  // const { colorMode } = useColorMode();

  // useEffect(() => {
  //   // Mengganti style peta sesuai dengan mode gelap atau terang
  //   if (colorMode === "dark") {
  //     setMapStyle("mapbox://styles/mapbox/dark-v11"); // Peta mode gelap
  //   } else {
  //     setMapStyle("mapbox://styles/mapbox/light-v10"); // Peta mode terang
  //   }
  // }, [colorMode]);

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
