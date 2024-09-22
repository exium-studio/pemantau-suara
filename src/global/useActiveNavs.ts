import { create } from "zustand";

interface State {
  panel: number | undefined;
}

interface Actions {
  setActiveNavs: (newState: State["panel"]) => void;
}

const useActiveNavs = create<State & Actions>((set) => ({
  panel: undefined,
  setActiveNavs: (newState) =>
    set(() => ({
      panel: newState,
    })),
}));

export default useActiveNavs;
