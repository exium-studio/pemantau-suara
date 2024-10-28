import { useColorMode } from "@chakra-ui/react";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import useLayerConfig from "../../../global/useLayerConfig";
import useselectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";
import useDataState from "../../../hooks/useDataState";
import useMapSpinner from "../../../global/useMapSpinner";

interface Props {
  geoJSONData: any[];
  mapRef: RefObject<MapRef>;
}

export default function LayerKelurahanSemarang({ geoJSONData, mapRef }: Props) {
  const { colorMode } = useColorMode();

  // Globals
  const { setSelectedGeoJSONKelurahan } = useselectedGeoJSONKelurahan();
  const { tahun, kategoriSuara, layer } = useLayerConfig();

  // States
  const dataRef = useRef<any[] | null>(null);
  const { data } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-map-kelurahan`,
    payload: {
      tahun: [tahun],
      kategori_suara: [kategoriSuara?.value],
    },
    conditions: !dataRef.current,
    dependencies: [tahun, kategoriSuara],
  });

  // Update dataRef ketika data baru tersedia
  useEffect(() => {
    if (data && (!dataRef.current || dataRef.current !== data)) {
      dataRef.current = data;
    }
  }, [data]);

  // Gabungkan semua GeoJSON menjadi satu FeatureCollection
  const combinedGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: geoJSONData.map((geoJSON) => {
        const kelurahanData = dataRef.current?.find(
          (item: any) =>
            item.kode_kelurahan === geoJSON?.properties?.village_code
        );

        const statusAktivitasColor = `#${
          kelurahanData?.status_aktivitas_kelurahan?.color ?? "FFFFFF"
        }`;
        const suaraKPUTerbanyakColor = `#${
          kelurahanData?.suara_kpu_terbanyak?.partai?.color ?? "FFFFFF"
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
  }, [geoJSONData, dataRef.current?.length, layer]);

  // Handle loading
  const {
    onOpenMapSpinner,
    onCloseMapSpinner,
    setLabelMapSpinner,
    resetLabelMapSpinner,
  } = useMapSpinner();
  const [loading, setLoading] = useState<boolean>(true);

  // Perbarui state loading berdasarkan combinedGeoJSON
  useEffect(() => {
    if (!combinedGeoJSON) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [combinedGeoJSON]);

  // Tampilkan atau sembunyikan spinner berdasarkan loading
  useEffect(() => {
    if (loading) {
      setLabelMapSpinner(
        "Sedang mendapatkan data peta. Fitur lainnya tetap bisa diakses"
      );
      onOpenMapSpinner();
    } else {
      resetLabelMapSpinner();
      onCloseMapSpinner();
    }
  }, [
    loading,
    onOpenMapSpinner,
    onCloseMapSpinner,
    setLabelMapSpinner,
    resetLabelMapSpinner,
  ]);

  // Handle onclick geoJSON kelurahan
  const handleLayerClick = useCallback(
    (event: any) => {
      const clickedFeature = event.features[0];
      if (!clickedFeature) return;

      const clickedVillageCode = clickedFeature.properties.village_code;
      const kelurahanData = dataRef.current?.find(
        (item: any) => item.kode_kelurahan === clickedVillageCode
      );

      const fillColor = kelurahanData
        ? `#${
            kelurahanData.status_aktivitas_kelurahan?.color ||
            kelurahanData.suara_kpu_terbanyak?.partai?.color ||
            "FFFFFF"
          }`
        : "#FFFFFF";

      setSelectedGeoJSONKelurahan({
        geoJSON: clickedFeature,
        color: fillColor,
      });
    },
    [setSelectedGeoJSONKelurahan]
  );

  // Menggunakan useRef untuk menyimpan handleLayerClick agar tidak selalu diperbarui
  const handleLayerClickRef = useRef(handleLayerClick);
  handleLayerClickRef.current = handleLayerClick;
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const clickHandler = (event: any) => handleLayerClickRef.current(event);

    map.on("click", "all-kelurahan-layer-fill", clickHandler);

    return () => {
      map.off("click", "all-kelurahan-layer-fill", clickHandler);
    };
  }, [mapRef]);

  // Render GeoJSON
  const render = useMemo(() => {
    if (!combinedGeoJSON) return null;

    return (
      <Source type="geojson" data={combinedGeoJSON}>
        <Layer
          id="all-kelurahan-layer-fill"
          type="fill"
          paint={{
            "fill-color": ["get", "fillColor"],
            "fill-opacity": 0.8,
          }}
        />
        <Layer
          id="all-kelurahan-layer-line"
          type="line"
          paint={{
            "line-color": colorMode === "dark" ? "#444" : "#444",
            "line-width": 1,
          }}
          layout={{
            "line-cap": "round",
            "line-join": "round",
          }}
        />
      </Source>
    );
  }, [combinedGeoJSON, colorMode]);

  return render;
}
