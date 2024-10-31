import { useColorMode } from "@chakra-ui/react";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import useLayerConfig from "../../../global/useLayerConfig";
import useMapSpinner from "../../../global/useMapSpinner";
import useSelectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";
import useDataState from "../../../hooks/useDataState";
import getUserData from "../../../lib/getUserData";
import useRenderTrigger from "../../../hooks/useRenderTrigger";

interface Props {
  geoJSONData: any[];
  mapRef: RefObject<MapRef>;
}

export default function LayerKelurahanSemarang({ geoJSONData, mapRef }: Props) {
  const { colorMode } = useColorMode();

  // Globals
  const { selectedGeoJSONKelurahan, setSelectedGeoJSONKelurahan } =
    useSelectedGeoJSONKelurahan();
  const {
    tahun,
    kategoriSuara,
    layer,
    opacity,
    setIsDisabledLayerConfig,
    setLayerConfigIsOpen,
  } = useLayerConfig();
  const { rt, setRt } = useRenderTrigger();
  const rtRef = useRef(rt);

  // States
  const dataRef = useRef<any[] | null>(null);
  const { data, loading } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-map-kelurahan`,
    payload: {
      tahun: [tahun],
      kategori_suara: [kategoriSuara?.value],
    },
    conditions: !dataRef.current,
    dependencies: [tahun, kategoriSuara],
  });
  const isUserPenggerak = getUserData().role.id === 3;

  // Update dataRef ketika data baru tersedia
  useEffect(() => {
    if (data && (!dataRef.current || dataRef.current !== data)) {
      dataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    dataRef.current = null;
    setRt(!rtRef.current);
  }, [tahun, kategoriSuara, setRt]);

  // Gabungkan semua GeoJSON menjadi satu FeatureCollection
  const combinedGeoJSON = useMemo(() => {
    if (tahun && kategoriSuara && layer) {
      return {
        type: "FeatureCollection",
        features: geoJSONData.map((geoJSON) => {
          const kelurahanData = dataRef.current?.find(
            (item: any) =>
              item.kode_kelurahan === geoJSON?.properties?.village_code
          );

          const statusAktivitasColor = `#${
            kelurahanData?.status_aktivitas_kelurahan?.color ?? "F0F0F0"
          }`;
          const suaraKPUTerbanyakColor = `#${
            kelurahanData?.suara_kpu_terbanyak?.partai?.color ?? "F0F0F0"
          }`;

          const fillColor =
            layer?.label === "Aktivitas"
              ? statusAktivitasColor
              : layer?.label === "Suara KPU"
              ? suaraKPUTerbanyakColor
              : "#F0F0F0";

          // console.log(layer?.label, fillColor);

          return {
            ...geoJSON,
            properties: {
              ...geoJSON.properties,
              fillColor,
            },
          };
        }),
      };
    }
  }, [geoJSONData, tahun, kategoriSuara, layer]);

  // Handle loading
  const {
    onOpenMapSpinner,
    onCloseMapSpinner,
    setLabelMapSpinner,
    resetLabelMapSpinner,
  } = useMapSpinner();
  useEffect(() => {
    if (loading) {
      setSelectedGeoJSONKelurahan(undefined);
      setLayerConfigIsOpen(false);
      setIsDisabledLayerConfig(true);
      setLabelMapSpinner(
        "Sedang mendapatkan data peta. Fitur lain selain Layer Config tetap bisa diakses"
      );
      onOpenMapSpinner();
    } else {
      setIsDisabledLayerConfig(false);
      resetLabelMapSpinner();
      onCloseMapSpinner();
    }
  }, [
    loading,
    onOpenMapSpinner,
    onCloseMapSpinner,
    setLabelMapSpinner,
    resetLabelMapSpinner,
    setIsDisabledLayerConfig,
    setLayerConfigIsOpen,
    setSelectedGeoJSONKelurahan,
  ]);

  // Handle onclick geoJSON kelurahan
  const handleLayerClick = useCallback(
    (event: any) => {
      if (isUserPenggerak) {
        return;
      }

      const clickedFeature = event.features[0];
      if (!clickedFeature) return;

      const clickedVillageCode = clickedFeature.properties.village_code;
      const kelurahanData = dataRef.current?.find(
        (item: any) => item.kode_kelurahan === clickedVillageCode
      );

      const statusAktivitasColor = `#${
        kelurahanData?.status_aktivitas_kelurahan?.color ?? "F0F0F0"
      }`;
      const suaraKPUTerbanyakColor = `#${
        kelurahanData?.suara_kpu_terbanyak?.partai?.color ?? "F0F0F0"
      }`;

      const fillColor =
        layer?.label === "Aktivitas"
          ? statusAktivitasColor
          : layer?.label === "Suara KPU"
          ? suaraKPUTerbanyakColor
          : "#F0F0F0";

      setSelectedGeoJSONKelurahan({
        geoJSON: clickedFeature,
        color: fillColor,
      });
    },
    [setSelectedGeoJSONKelurahan, layer?.label, isUserPenggerak]
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

    const selectedVillageCode =
      selectedGeoJSONKelurahan?.geoJSON.properties?.village_code;

    // const layerFillOpacity = colorMode === "dark" ? 0.8 : 0.8;
    const layerFillOpacity = opacity * 0.01;
    const layerLineColor = colorMode === "dark" ? "#ccc" : "#444";

    return (
      <Source type="geojson" data={combinedGeoJSON}>
        <Layer
          id="all-kelurahan-layer-fill"
          type="fill"
          paint={{
            "fill-color": ["get", "fillColor"],
            // "fill-opacity": selectedGeoJSONKelurahan ? 0.1 : 0.8,
            "fill-opacity": selectedVillageCode
              ? [
                  "case",
                  [
                    "boolean",
                    ["==", ["get", "village_code"], selectedVillageCode],
                    false,
                  ],
                  layerFillOpacity,
                  layerFillOpacity * 0.01,
                ]
              : layerFillOpacity,
          }}
        />
        <Layer
          id="all-kelurahan-layer-line"
          type="line"
          paint={{
            "line-color": layerLineColor,
            "line-width": 1,
          }}
          layout={{
            "line-cap": "round",
            "line-join": "round",
          }}
        />
      </Source>
    );
  }, [combinedGeoJSON, colorMode, selectedGeoJSONKelurahan, opacity]);

  return render;
}
