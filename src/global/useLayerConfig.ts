import { create } from "zustand";
import { Interface__SelectOption } from "../constant/interfaces";

interface State {
  layerConfig: boolean;
  isDisabledLayerConfig: boolean;
  tahun: number | undefined;
  kategoriSuara: Interface__SelectOption;
  layer: Interface__SelectOption;
  opacity: number;
}

interface Actions {
  setLayerConfigIsOpen: (newState: State["layerConfig"]) => void;
  toggleLayerConfig: () => void;
  setIsDisabledLayerConfig: (newState: State["isDisabledLayerConfig"]) => void;
  onCloseLayerConfig: () => void;
  setTahun: (newState: State["tahun"]) => void;
  setKategoriSuara: (newState: State["kategoriSuara"]) => void;
  setLayer: (newState: State["layer"]) => void;
  setOpacity: (newState: State["opacity"]) => void;
}

const useLayerConfig = create<State & Actions>((set) => ({
  layerConfig: false,
  isDisabledLayerConfig: false,

  // tahun: new Date().getFullYear(),
  tahun: 2024,
  kategoriSuara: { value: 2, label: "Pileg" },
  layer: { value: 1, label: "Aktivitas" },
  opacity: 100,

  setOpacity: (newState) =>
    set(() => ({
      opacity: newState,
    })),

  setLayerConfigIsOpen: (newState) =>
    set(() => ({
      layerConfig: newState,
    })),

  setIsDisabledLayerConfig: (newState) =>
    set(() => ({
      isDisabledLayerConfig: newState,
    })),

  toggleLayerConfig: () =>
    set((ps) => ({
      layerConfig: !ps.layerConfig,
    })),
  onCloseLayerConfig: () => set({ layerConfig: false }),

  setTahun: (newState) =>
    set(() => ({
      tahun: newState,
    })),
  setKategoriSuara: (newState) =>
    set(() => ({
      kategoriSuara: newState,
    })),
  setLayer: (newState) =>
    set(() => ({
      layer: newState,
    })),
}));

export default useLayerConfig;
