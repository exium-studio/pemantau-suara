import { create } from "zustand";

interface State {
  selectedGeoJSONKelurahan: any;
}

interface Actions {
  setSelectedGeoJSONKelurahan: (
    newState: State["selectedGeoJSONKelurahan"]
  ) => void;
}

const useSelectedGeoJSONKelurahan = create<State & Actions>((set) => ({
  selectedGeoJSONKelurahan: undefined,
  setSelectedGeoJSONKelurahan: (newState) =>
    set({
      selectedGeoJSONKelurahan: newState,
    }),
}));

export default useSelectedGeoJSONKelurahan;
