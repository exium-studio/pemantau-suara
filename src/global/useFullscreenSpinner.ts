import { create } from "zustand";

interface State {
  label: string;
  isOpen: boolean;
}

interface Actions {
  setLabel: (newState: State["label"]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFullscreenSpinner = create<State & Actions>((set) => ({
  label: "",
  setLabel: (newState) => set({ label: newState }),
  isOpen: false,
  onOpen: () =>
    set({
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
    }),
}));

export default useFullscreenSpinner;
