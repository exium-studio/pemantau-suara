import { Box } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import useGeoJSONKelurarhanSemarang from "../../global/useGeoJSONKelurahanSemarang";
import Maps from "../dependent/Maps";
import ComponentSpinner from "./ComponentSpinner";
import FullscreenSpinner from "./FullscreenSpinner";
import useMapSpinner from "../../global/useMapSpinner";

export default function DashboardMap() {
  const { geoJSONKelurahanSemarang, fetchGeoJSON } =
    useGeoJSONKelurarhanSemarang();
  const { label, isOpen } = useMapSpinner();

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

      <FullscreenSpinner
        position={"absolute"}
        left={0}
        top={0}
        zIndex={2}
        visibility={isOpen ? "visible" : "hidden"}
        opacity={isOpen ? 1 : 0}
        label={label}
      />
    </Box>
  );
}
