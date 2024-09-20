import { create } from "zustand";

interface State {
  geoJSONData: any[];
}

interface Actions {
  setGeoJSONData: (newState: State["geoJSONData"]) => void;
}

const useGeoJSONData = create<State & Actions>((set) => ({
  geoJSONData: [],
  setGeoJSONData: (newState) =>
    set({
      geoJSONData: newState,
    }),
}));

export default useGeoJSONData;
