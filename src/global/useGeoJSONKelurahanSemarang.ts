import { create } from "zustand";

interface State {
  geoJSONKelurahanSemarang: any[] | undefined;
}

interface Actions {
  setGeoJSONKelurahanSemarang: (
    newState: State["geoJSONKelurahanSemarang"]
  ) => void;
  fetchGeoJSON: () => Promise<void>;
}

const useGeoJSONKelurahanSemarang = create<State & Actions>((set) => ({
  geoJSONKelurahanSemarang: undefined,
  setGeoJSONKelurahanSemarang: (newState) =>
    set({ geoJSONKelurahanSemarang: newState }),
  fetchGeoJSON: async () => {
    try {
      const response = await fetch("/geoJSON/geoJSONKelurahanSemarang.geojson");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      set({ geoJSONKelurahanSemarang: data });
    } catch (error) {
      console.error("Failed to fetch GeoJSON:", error);
    }
  },
}));

export default useGeoJSONKelurahanSemarang;
