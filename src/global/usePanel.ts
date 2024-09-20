import { create } from "zustand";

interface State {
  panel: boolean;
}

interface Actions {
  togglePanel: () => void;
}

const usePanel = create<State & Actions>((set) => ({
  panel: localStorage.getItem("panel") === "1" ? true : false,
  togglePanel: () =>
    set((ps) => ({
      panel: !ps.panel,
    })),
}));

export default usePanel;
