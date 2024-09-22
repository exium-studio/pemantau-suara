import { create } from "zustand";

interface State {
  highlightedKecamatanIndex: number[];
}

interface Actions {
  setHighlightedKecamatanIndex: (newState: number[]) => void;
  toggleHighlightedKecamatanIndex: (index: number) => void;
  removeFromHighlightedKecamatanIndex: (index: number) => void;
}

const useHighlighedKecamatan = create<State & Actions>((set) => ({
  highlightedKecamatanIndex: [],

  setHighlightedKecamatanIndex: (newState: number[]) =>
    set({ highlightedKecamatanIndex: newState }),

  toggleHighlightedKecamatanIndex: (index: number) => {
    set((prev) => ({
      highlightedKecamatanIndex: prev.highlightedKecamatanIndex.includes(index)
        ? prev.highlightedKecamatanIndex.filter((i) => i !== index)
        : [...prev.highlightedKecamatanIndex, index],
    }));
  },

  removeFromHighlightedKecamatanIndex: (index: number) => {
    set((prev) => ({
      highlightedKecamatanIndex: prev.highlightedKecamatanIndex.filter(
        (i) => i !== index
      ),
    }));
  },
}));

export default useHighlighedKecamatan;
