import { Box, HStack, Text, useColorMode } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { CSSProperties, FC, useEffect, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import { useLightDarkColor } from "../../constant/colors";
import CContainer from "../independent/wrapper/CContainer";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  markerLat?: number;
  markerLng?: number;
  style?: CSSProperties;
}

// Define array of objects containing geojson paths, colors, and names
const geojsonLayers = [
  {
    name: "Kota Semarang",
    geojson: "/asset/geojson/id3374_kota_semarang.geojson",
    color: "#A6CEE3",
  },
  {
    name: "Mijen",
    geojson: "/asset/geojson/id3374010_mijen.geojson",
    color: "#B2DF8A",
  },
  {
    name: "Gunung Pati",
    geojson: "/asset/geojson/id3374020_gunung_pati.geojson",
    color: "#FB9A99",
  },
  {
    name: "Banyumanik",
    geojson: "/asset/geojson/id3374030_banyumanik.geojson",
    color: "#FDBF6F",
  },
  {
    name: "Gajah Mungkur",
    geojson: "/asset/geojson/id3374040_gajah_mungkur.geojson",
    color: "#CAB2D6",
  },
  // Add all other regions here with their corresponding colors and geojson paths
];

const MapboxMap: FC<MapProps> = ({
  latitude,
  longitude,
  zoom,
  markerLat,
  markerLng,
  style,
}) => {
  // SX
  const lightDarkColor = useLightDarkColor();

  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom,
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

  const baseStyle = {
    width: "100vw",
    height: "100vh",
  };

  // State to store loaded GeoJSON data
  const [geojsonData, setGeojsonData] = useState<any[]>([]);

  // Load all GeoJSON files in parallel and store them
  useEffect(() => {
    Promise.all(
      geojsonLayers.map((layer) =>
        fetch(layer.geojson).then((res) => res.json())
      )
    )
      .then((data) => setGeojsonData(data))
      .catch((err) => console.error("Error loading GeoJSON files:", err));
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Map component */}
      <Map
        {...viewState}
        style={{ ...baseStyle, ...style }}
        mapStyle={mapStyle}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {/* Display marker if marker coordinates are provided */}
        {markerLat && markerLng && (
          <Marker latitude={markerLat} longitude={markerLng} color="red" />
        )}

        {/* Display all loaded GeoJSON files with unique colors */}
        {geojsonData.map((geojson, index) => (
          <Source key={index} type="geojson" data={geojson}>
            <Layer
              id={`geojson-layer-${index}`}
              type="fill" // Customize this based on what you need
              paint={{
                "fill-color": geojsonLayers[index].color, // Use the color from the array
                "fill-opacity": 0.4, // Adjust opacity for elegance
                "fill-outline-color": "#000000", // Add a thin black outline
              }}
            />
          </Source>
        ))}
      </Map>

      {/* Legend Component */}
      <Box
        position={"absolute"}
        bottom={4}
        left={4}
        bg={lightDarkColor}
        py={2}
        pl={3}
        pr={4}
        borderRadius={12}
      >
        <Text fontWeight={600} mb={2}>
          Legenda
        </Text>

        <CContainer gap={2}>
          {geojsonLayers.map((layer, i) => (
            <HStack key={i}>
              <Box w={"20px"} h={"20px"} borderRadius={8} bg={layer.color} />
              <Text>{layer.name}</Text>
            </HStack>
          ))}
        </CContainer>
      </Box>
    </div>
  );
};

export default MapboxMap;
