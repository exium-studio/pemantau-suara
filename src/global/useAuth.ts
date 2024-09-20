import { create } from "zustand";

interface State {
  panel: boolean;
}

interface Actions {
  setActiveDrawerId: () => void;
}

const usePanel = create<State & Actions>((set) => ({
  panel: false,
  setActiveDrawerId: () =>
    set((ps) => ({
      panel: !ps.panel,
    })),
}));

export default usePanel;
