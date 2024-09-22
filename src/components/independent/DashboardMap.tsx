import { Box } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import geoJSONLayers from "../../constant/geoJSONLayers";
import MapboxMap from "../dependent/MapboxMap";

export default function DashboardMap() {
  // Fetch all geoJSON data
  const [geoJSONData, setGeojsonData] = useState<any[]>([]);
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

  return (
    <Box position={"relative"}>
      <MapboxMap
        geoJSONData={geoJSONData}
        latitude={-7.02}
        longitude={110.38}
        zoom={11}
      />
    </Box>
  );
}
