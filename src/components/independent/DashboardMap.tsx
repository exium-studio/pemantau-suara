import { Box } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import geoJSONLayers from "../../constant/geoJSONLayers";
import useGeoJSONKecamatan from "../../global/useGeoJSONKecamatan";
import Maps from "../dependent/Maps";
import geoJSONKelurahanSemarang from "../../constant/geoJSONKelurahanSemarang";

export default function DashboardMap() {
  // Fetch all geoJSON data
  const { geoJSONKecamatan, setGeoJSONKecamatan } = useGeoJSONKecamatan();
  useEffect(() => {
    const fetchGeoJSONData = async () => {
      try {
        const data = await Promise.all(
          geoJSONLayers.map((layer) =>
            fetch(layer.geojson).then((res) => res.json())
          )
        );
        setGeoJSONKecamatan(data);
      } catch (err) {
        console.error("Error loading GeoJSON files:", err);
      }
    };
    if (!geoJSONKecamatan) {
      fetchGeoJSONData();
    }
  }, [geoJSONKecamatan, setGeoJSONKecamatan]);

  return (
    <Box position={"relative"}>
      <Maps
        geoJSONData={geoJSONKelurahanSemarang}
        latitude={-7.02}
        longitude={110.38}
        zoom={11}
      />
    </Box>
  );
}
