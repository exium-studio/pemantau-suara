import { useColorMode } from "@chakra-ui/react";
import { RefObject, useCallback, useEffect } from "react";
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
  const { setSelectedGeoJSONKelurahan } = useselectedGeoJSONKelurahan();
  const { tahun, kategoriSuara } = useLayerConfig();

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
    (layer: any) => (event: any) => {
      const clickedFeature = event.features[0];
      if (clickedFeature) {
        setSelectedGeoJSONKelurahan({
          layer: layer,
          geoJSONData: clickedFeature,
        });
      }
    },
    [setSelectedGeoJSONKelurahan]
  );

  // Menambahkan event listener pada peta ketika komponen dirender
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    geoJSONData.forEach((layer: any, i: number) => {
      const layerId = `geojson-layer-${i}`;
      map.on("click", layerId, handleLayerClick(layer));

      return () => {
        map.off("click", layerId, handleLayerClick(layer));
      };
    });
  }, [mapRef, geoJSONData, handleLayerClick]);

  return (
    <>
      {geoJSONData.map((layer: any, i: number) => {
        const statusAktivitasColor = `#${
          data?.[i]?.status_aktivitas_kelurahan?.color || "#fff"
        }`;
        const suaraKPUTerbanyakColor = `#${
          data?.[i]?.suara_kpu_terbanyak?.color || "#fff"
        }`;

        const fillColor = (() => {
          switch (layer.value) {
            case "Aktivitas":
              return statusAktivitasColor;
            case "Suara KPU":
              return suaraKPUTerbanyakColor;
            default:
              return "#ffffff";
          }
        })();

        return (
          <Source key={i} type="geojson" data={layer}>
            <Layer
              id={`geojson-layer-${i}`}
              type="fill"
              paint={{
                "fill-color": fillColor,
                "fill-opacity": 0.6,
                "fill-outline-color": colorMode === "dark" ? "#fff" : "#444",
              }}
            />
          </Source>
        );
      })}
    </>
  );
}
