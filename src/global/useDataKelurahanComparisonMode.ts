import { create } from "zustand";

interface State {
  dataKelurahanComparaisonMode: boolean;
}

interface Actions {
  setDataKelurahanComparisonMode: (
    newState: State["dataKelurahanComparaisonMode"]
  ) => void;
  toggleDataKelurahanComparisonMode: () => void;
}

const useDataKelurahanComparisonMode = create<State & Actions>((set) => ({
  dataKelurahanComparaisonMode: false,
  setDataKelurahanComparisonMode: (newState) =>
    set(() => ({
      dataKelurahanComparaisonMode: newState,
    })),
  toggleDataKelurahanComparisonMode: () =>
    set((ps) => ({
      dataKelurahanComparaisonMode: !ps?.dataKelurahanComparaisonMode,
    })),
}));

export default useDataKelurahanComparisonMode;
