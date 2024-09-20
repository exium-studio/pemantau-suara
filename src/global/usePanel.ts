import { create } from "zustand";

interface State {
  panel: boolean;
}

interface Actions {
  setPanel: () => void;
}

const usePanel = create<State & Actions>((set) => ({
  panel: false,
  setPanel: () =>
    set((ps) => ({
      panel: !ps.panel,
    })),
}));

export default usePanel;
