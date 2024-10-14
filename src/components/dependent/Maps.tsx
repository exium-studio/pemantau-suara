import { Box, useColorMode } from "@chakra-ui/react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Map, MapRef, Marker } from "react-map-gl";
import useSearchAddress from "../../global/useSearchAddress";
import LayerHoveredAndClickedKelurahan from "../independent/mapLayer/LayerHoveredAndClickedKelurahan";
import LayerKelurahanSemarang from "../independent/mapLayer/LayerKelurahanSemarang";
import getUserData from "../../lib/getUserData";

interface Props {
  geoJSONData: any;
  latitude: number;
  longitude: number;
  zoom: number;
  markerLat?: number;
  markerLng?: number;
  style?: CSSProperties;
}

export default function Maps({
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

  // States
  const userData = getUserData();
  const allowedKelurahan = userData?.kelurahan?.map(
    (kelurahan: any) => kelurahan?.kode_kelurahan
  );
  const isSuperAdmin = userData?.role?.id === 1;
  const filteredGeoJSON = isSuperAdmin
    ? geoJSONData
    : geoJSONData?.filter((kelurahan: any) => {
        return allowedKelurahan?.includes(kelurahan?.properties?.village_code);
      }) || [];

  // Handle render map component
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState("");
  const [viewState] = useState({ latitude, longitude, zoom });
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
      initialViewState={viewState}
      doubleClickZoom={false}
      pitchWithRotate={false}
      dragRotate={false}
      // {...viewState}
      pitch={0}
      style={{ width: "100vw", height: "100vh", ...style }}
      mapStyle={mapStyle}
      // onMove={(evt) => setViewState(evt.viewState)}
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

          {/* Layer all kelurahan */}
          <LayerKelurahanSemarang
            mapRef={mapRef}
            geoJSONData={filteredGeoJSON}
          />

          {/* Hovered & clicked layers */}
          <LayerHoveredAndClickedKelurahan />
        </>
      )}
    </Map>
  );
}
