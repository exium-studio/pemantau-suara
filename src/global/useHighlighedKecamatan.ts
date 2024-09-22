import { create } from "zustand";

interface State {
  highlightedKecamatanIndex: number[];
}

interface Actions {
  setHighlightedKecamatanIndex: (newState: number[]) => void;
  toggleHighlightedKecamatanIndex: (index: number) => void;
}

const useHighlighedKecamatan = create<State & Actions>((set, get) => ({
  highlightedKecamatanIndex: [],
  setHighlightedKecamatanIndex: (newState: number[]) =>
    set({ highlightedKecamatanIndex: newState }),

  toggleHighlightedKecamatanIndex: (index: number) => {
    const prev = get().highlightedKecamatanIndex;
    const newState = prev.includes(index)
      ? prev.filter((i) => i !== index)
      : [...prev, index];

    set({ highlightedKecamatanIndex: newState });
  },
}));

export default useHighlighedKecamatan;
