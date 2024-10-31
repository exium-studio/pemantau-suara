import { useColorMode } from "@chakra-ui/react";
import { Dispatch, RefObject, useCallback, useEffect, useState } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import useLayerConfig from "../../../global/useLayerConfig";
import useMapSpinner from "../../../global/useMapSpinner";
import useSelectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";
import getUserData from "../../../lib/getUserData";
import request from "../../../lib/request";

interface Props {
  geoJSONData: any[];
  mapRef: RefObject<MapRef>;
  setKey: Dispatch<number>;
  mapKey: number;
}

export default function LayerKelurahanSemarang({ geoJSONData, mapRef }: Props) {
  // Utils
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

  // Data state
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);

    const payload = {
      tahun: [tahun],
      kategori_suara: [kategoriSuara?.value],
    };

    request
      .post(`/api/pemantau-suara/publik-request/get-map-kelurahan`, payload)
      .then((r) => {
        if (r.status === 200) {
          setData(r.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tahun, kategoriSuara]);

  // Handle map fullscreen spinner
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

  // Gabungkan geoJSON dan data dari Sendi
  const combinedGeoJSON = {
    type: "FeatureCollection",
    features: geoJSONData.map((geoJSON) => {
      const kelurahanData = data?.find(
        (item: any) => item.kode_kelurahan === geoJSON?.properties?.village_code
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

  // Handle onclick bidang kelurahan
  const isUserPenggerak = getUserData().role.id === 3;
  const handleOnClickBidangKelurahan = useCallback(
    (event: any) => {
      if (isUserPenggerak) {
        return;
      }

      const clickedFeature = event.features[0];
      if (!clickedFeature) return;

      const clickedVillageCode = clickedFeature.properties.village_code;
      const kelurahanData = data?.find(
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
    [setSelectedGeoJSONKelurahan, layer?.label, isUserPenggerak, data]
  );
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const clickHandler = (event: any) => handleOnClickBidangKelurahan(event);

    map.on("click", "all-kelurahan-layer-fill", clickHandler);

    return () => {
      map.off("click", "all-kelurahan-layer-fill", clickHandler);
    };
  }, [mapRef, handleOnClickBidangKelurahan]);

  return (
    <Source type="geojson" data={combinedGeoJSON}>
      <Layer
        id="all-kelurahan-layer-fill"
        type="fill"
        paint={{
          "fill-color": ["get", "fillColor"],
          // "fill-opacity": selectedGeoJSONKelurahan ? 0.1 : 0.8,
          "fill-opacity": selectedGeoJSONKelurahan?.geoJSON.properties
            ?.village_code
            ? [
                "case",
                [
                  "boolean",
                  [
                    "==",
                    ["get", "village_code"],
                    selectedGeoJSONKelurahan?.geoJSON.properties?.village_code,
                  ],
                  false,
                ],
                opacity * 0.01,
                opacity * 0.01 * 0.2,
              ]
            : opacity * 0.01,
        }}
      />
      <Layer
        id="all-kelurahan-layer-line"
        type="line"
        paint={{
          "line-color": colorMode === "dark" ? "#ccc" : "#222",
          "line-width": 1,
        }}
        layout={{
          "line-cap": "round",
          "line-join": "round",
        }}
      />
    </Source>
  );

  // return null;
}
