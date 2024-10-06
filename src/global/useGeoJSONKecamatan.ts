import { create } from "zustand";

interface State {
  geoJSONKecamatan: any[] | undefined;
}

interface Actions {
  setGeoJSONKecamatan: (newState: State["geoJSONKecamatan"]) => void;
}

const useGeoJSONKecamatan = create<State & Actions>((set) => ({
  geoJSONKecamatan: undefined,
  setGeoJSONKecamatan: (newState) => set({ geoJSONKecamatan: newState }),
}));

export default useGeoJSONKecamatan;
