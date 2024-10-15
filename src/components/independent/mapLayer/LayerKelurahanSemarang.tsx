import { useColorMode } from "@chakra-ui/react";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { Layer, MapRef, Source } from "react-map-gl";
import useselectedGeoJSONKelurahan from "../../../global/useSelectedGeoJSONKelurahan";
import useDataState from "../../../hooks/useDataState";
import useFullscreenSpinner from "../../../global/useFullscreenSpinner";
import useLayerConfig from "../../../global/useLayerConfig";

interface Props {
  geoJSONData: any;
  mapRef: RefObject<MapRef>;
}

export default function LayerKelurahanSemarang({ geoJSONData, mapRef }: Props) {
  // SX
  const { colorMode } = useColorMode();

  // Globals
  const { selectedGeoJSONKelurahan, setSelectedGeoJSONKelurahan } =
    useselectedGeoJSONKelurahan();
  const selectedKodeKelurahan =
    selectedGeoJSONKelurahan?.geoJSON?.properties?.village_code;
  const { tahun, kategoriSuara, layer } = useLayerConfig();

  // Data ref untuk menyimpan data lama
  const dataRef = useRef<any>(null);

  // States
  const { loading, data } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-map-kelurahan`,
    payload: {
      tahun: [tahun],
      kategori_suara: [kategoriSuara?.value],
    },
    conditions: !dataRef.current,
    dependencies: [tahun, kategoriSuara],
  });

  // Menyimpan data terbaru di dalam dataRef.current
  useEffect(() => {
    if (data) {
      dataRef.current = data;
    }
  }, [data]);

  // Utils
  const { onFullscreenSpinnerOpen, onFullscreenSpinnerClose } =
    useFullscreenSpinner();

  // Handle loading
  useEffect(() => {
    if (loading) {
      console.log(loading);
      onFullscreenSpinnerOpen();
    } else {
      onFullscreenSpinnerClose();
    }
  }, [loading, onFullscreenSpinnerOpen, onFullscreenSpinnerClose]);

  // Fungsi untuk menangani klik pada layer
  const handleLayerClick = useCallback(
    (index: number) => (event: any) => {
      const clickedFeature = event.features[0];
      const statusAktivitasColor = `#${
        data?.[index]?.status_aktivitas_kelurahan?.color || "FFFFFF"
      }`;
      const suaraKPUTerbanyakColor = `#${
        data?.[index]?.suara_kpu_terbanyak?.partai?.color || "FFFFFF"
      }`;
      const fillColor = (() => {
        switch (layer?.label) {
          case "Aktivitas":
            return statusAktivitasColor;
          case "Suara KPU":
            return suaraKPUTerbanyakColor;
          default:
            return "#FFFFFF";
        }
      })();

      if (clickedFeature) {
        setSelectedGeoJSONKelurahan({
          geoJSON: clickedFeature,
          color: fillColor,
        });
      }
    },
    [setSelectedGeoJSONKelurahan, data, layer?.label]
  );

  // Menambahkan event listener pada peta ketika komponen dirender
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    geoJSONData.forEach((_: any, i: number) => {
      const layerId = `geojson-layer-${i}`;
      map.on("click", layerId, handleLayerClick(i));

      return () => {
        map.off("click", layerId, handleLayerClick(i));
      };
    });
  }, [mapRef, geoJSONData, handleLayerClick]);

  // console.log(
  //   data?.map((item: any) => {
  //     const matchedGeoJSON = geoJSONData.find(
  //       (geoJSON: any) =>
  //         geoJSON?.properties?.village_code === item?.kode_kelurahan
  //     );
  //     return matchedGeoJSON || { message: "No match found", item: item };
  //   })
  // );

  const render = useMemo(
    () => (
      <>
        {geoJSONData.map((geoJSON: any, i: number) => {
          const statusAktivitasColor = `#${
            data?.[i]?.status_aktivitas_kelurahan?.color || "FFFFFF"
          }`;
          const suaraKPUTerbanyakColor = `#${
            data?.[i]?.suara_kpu_terbanyak?.partai?.color || "FFFFFF"
          }`;
          const fillColor = (() => {
            switch (layer?.label) {
              case "Aktivitas":
                return statusAktivitasColor;
              case "Suara KPU":
                return suaraKPUTerbanyakColor;
              default:
                return "#FFFFFF";
            }
          })();

          return (
            <Source key={i} type="geojson" data={geoJSON}>
              <Layer
                id={`geojson-layer-${i}`}
                type="fill"
                paint={{
                  "fill-color": fillColor,
                  "fill-opacity":
                    geoJSON?.properties?.village_code === selectedKodeKelurahan
                      ? 1
                      : selectedKodeKelurahan
                      ? 0.1
                      : layer?.label === "Suara KPU" &&
                        !data?.[i]?.suara_kpu_terbanyak
                      ? 0
                      : 0.6,
                  // "fill-outline-color": colorMode === "dark" ? "#fff" : "#444",
                }}
              />

              <Layer
                id={`geojson-layer-line-${i}`}
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
        })}
      </>
    ),
    [colorMode, data, geoJSONData, layer, selectedKodeKelurahan]
  );

  return render;
}
