import { Box } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import useGeoJSONKelurarhanSemarang from "../../global/useGeoJSONKelurahanSemarang";
import Maps from "../dependent/Maps";
import ComponentSpinner from "./ComponentSpinner";

export default function DashboardMap() {
  const { geoJSONKelurahanSemarang, fetchGeoJSON } =
    useGeoJSONKelurarhanSemarang();

  useEffect(() => {
    fetchGeoJSON();
  }, [fetchGeoJSON]);

  return (
    <Box position={"relative"}>
      {geoJSONKelurahanSemarang ? (
        <Maps
          geoJSONData={geoJSONKelurahanSemarang}
          latitude={-7.02}
          longitude={110.38}
          zoom={11}
        />
      ) : (
        <ComponentSpinner h={"100vh"} />
      )}
    </Box>
  );
}
