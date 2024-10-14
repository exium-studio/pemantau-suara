import { create } from "zustand";
import { Interface__SelectOption } from "../constant/interfaces";

interface State {
  tahun: number | undefined;
  kategoriSuara: Interface__SelectOption | undefined;
  layer: Interface__SelectOption | undefined;
}

interface Actions {
  setTahun: (newState: State["tahun"]) => void;
  setKategoriSuara: (newState: State["kategoriSuara"]) => void;
  setLayer: (newState: State["layer"]) => void;
}

const useLayerConfig = create<State & Actions>((set) => ({
  tahun: new Date().getFullYear(),
  kategoriSuara: { value: 1, label: "Pemilu" },
  layer: { value: 1, label: "Aktivitas" },

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
