import { create } from "zustand";

interface State {
  searchAddress: string;
  searchResult: any;
  searchSelected: any;
}

interface Actions {
  setSearchAddress: (newState: State["searchAddress"]) => void;
  setSearchResult: (newState: State["searchResult"]) => void;
  setSearchSelected: (newState: State["searchSelected"]) => void;
}

const useSearchAddress = create<State & Actions>((set) => ({
  searchAddress: "",
  setSearchAddress: (newState) => set({ searchAddress: newState }),

  searchResult: [],
  setSearchResult: (newState) => set({ searchResult: newState }),

  searchSelected: "",
  setSearchSelected: (newState) => set({ searchSelected: newState }),
}));

export default useSearchAddress;
