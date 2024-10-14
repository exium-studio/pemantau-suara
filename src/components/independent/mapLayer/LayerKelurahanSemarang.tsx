import { useColorMode } from "@chakra-ui/react";
import { RefObject, useCallback, useEffect, useMemo } from "react";
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
  const kode_kelurahan =
    selectedGeoJSONKelurahan?.geoJSON?.properties?.village_code;
  const { tahun, kategoriSuara, layer } = useLayerConfig();

  // States
  const { loading, data } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-map-kelurahan`,
    payload: {
      tahun: [tahun],
      kategori_suara: [kategoriSuara?.value],
    },
    dependencies: [tahun, kategoriSuara],
  });

  // Utils
  const { onFullscreenSpinnerOpen, onFullscreenSpinnerClose } =
    useFullscreenSpinner();

  // Handle loading
  useEffect(() => {
    if (loading) {
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

          // console.log(geoJSON?.properties?.village_code === kode_kelurahan);
          // console.log(geoJSON?.properties?.village_code);
          // console.log(kode_kelurahan);

          return (
            <Source key={i} type="geojson" data={geoJSON}>
              <Layer
                id={`geojson-layer-${i}`}
                type="fill"
                paint={{
                  "fill-color": fillColor,
                  "fill-opacity":
                    geoJSON?.properties?.village_code === kode_kelurahan
                      ? 1
                      : kode_kelurahan
                      ? 0.2
                      : 0.6,
                  "fill-outline-color": colorMode === "dark" ? "#fff" : "#444",
                }}
              />
            </Source>
          );
        })}
      </>
    ),
    [colorMode, data, geoJSONData, layer, kode_kelurahan]
  );

  return render;
}
