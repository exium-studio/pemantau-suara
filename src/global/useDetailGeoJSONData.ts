import { create } from "zustand";

interface State {
  detailGeoJSONData: any;
}

interface Actions {
  setDetailGeoJSONData: (newState: State["detailGeoJSONData"]) => void;
}

const useDetailGeoJSONData = create<State & Actions>((set) => ({
  detailGeoJSONData: undefined,
  setDetailGeoJSONData: (newState) =>
    set({
      detailGeoJSONData: newState,
    }),
}));

export default useDetailGeoJSONData;
