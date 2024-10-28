import { useColorMode } from "@chakra-ui/react";
import { RefObject, useEffect, useMemo } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import useLayerConfig from "../../../global/useLayerConfig";
import useselectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";
import useDataState from "../../../hooks/useDataState";

interface Props {
  geoJSONData: any[];
  mapRef: RefObject<MapRef>;
}

export default function LayerKelurahanSemarang({ geoJSONData, mapRef }: Props) {
  const { colorMode } = useColorMode();

  // Globals
  const { selectedGeoJSONKelurahan, setSelectedGeoJSONKelurahan } =
    useselectedGeoJSONKelurahan();
  const selectedKodeKelurahan =
    selectedGeoJSONKelurahan?.geoJSON?.properties?.village_code;
  const { tahun, kategoriSuara, layer } = useLayerConfig();

  // States
  const { data } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-map-kelurahan`,
    payload: {
      tahun: [tahun],
      kategori_suara: [kategoriSuara?.value],
    },
    conditions: true,
    dependencies: [tahun, kategoriSuara],
  });

  // Gabungkan semua GeoJSON menjadi satu FeatureCollection
  const combinedGeoJSON = useMemo(() => {
    if (!geoJSONData || !data) return null;

    return {
      type: "FeatureCollection",
      features: geoJSONData.map((geoJSON) => {
        const kelurahanData = data.find(
          (item: any) => item.kode_kelurahan === geoJSON.properties.village_code
        );

        const statusAktivitasColor = `#${
          kelurahanData?.status_aktivitas_kelurahan?.color || "FFFFFF"
        }`;
        const suaraKPUTerbanyakColor = `#${
          kelurahanData?.suara_kpu_terbanyak?.partai?.color || "FFFFFF"
        }`;

        const fillColor =
          layer?.label === "Aktivitas"
            ? statusAktivitasColor
            : layer?.label === "Suara KPU"
            ? suaraKPUTerbanyakColor
            : "#FFFFFF";

        return {
          ...geoJSON,
          properties: {
            ...geoJSON.properties,
            fillColor,
          },
        };
      }),
    };
  }, [geoJSONData, data, layer]);

  // Loader
  useEffect(() => {
    console.log("Combined GeoJSON:", combinedGeoJSON);

    if (!combinedGeoJSON) {
    }
  }, [combinedGeoJSON]);

  // Fungsi untuk menangani klik pada layer
  const handleLayerClick = (event: any) => {
    const clickedFeature = event.features[0];
    if (!clickedFeature) return;

    const clickedVillageCode = clickedFeature.properties.village_code;
    const kelurahanData = data.find(
      (item: any) => item.kode_kelurahan === clickedVillageCode
    );

    const fillColor = kelurahanData
      ? `#${
          kelurahanData.status_aktivitas_kelurahan?.color ||
          kelurahanData.suara_kpu_terbanyak?.partai?.color ||
          "FFFFFF"
        }`
      : "#FFFFFF";

    console.log("Clicked feature:", clickedFeature);
    console.log("Corresponding Kelurahan data:", kelurahanData);

    setSelectedGeoJSONKelurahan({
      geoJSON: clickedFeature,
      color: fillColor,
    });
  };

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    map.on("click", "geojson-layer", handleLayerClick);

    return () => {
      map.off("click", "geojson-layer", handleLayerClick);
    };
  }, [mapRef, handleLayerClick]);

  const render = useMemo(() => {
    if (!combinedGeoJSON) return null;

    return (
      <Source type="geojson" data={combinedGeoJSON}>
        <Layer
          id="geojson-layer"
          type="fill"
          paint={{
            "fill-color": ["get", "fillColor"],
            "fill-opacity": [
              "case",
              ["==", ["get", "village_code"], selectedKodeKelurahan],
              1,
              selectedKodeKelurahan ? 0.1 : 0.6,
            ],
          }}
        />
        <Layer
          id="geojson-layer-line"
          type="line"
          paint={{
            "line-color": colorMode === "dark" ? "#ccc" : "#444",
            "line-width": 1,
          }}
          layout={{
            "line-cap": "round",
            "line-join": "round",
          }}
        />
      </Source>
    );
  }, [combinedGeoJSON, colorMode, selectedKodeKelurahan]);

  return render;
}
