import { create } from "zustand";

interface State {
  label: string;
  isOpen: boolean;
}

interface Actions {
  setLabel: (newState: State["label"]) => void;
  onFullscreenSpinnerOpen: () => void;
  onFullscreenSpinnerClose: () => void;
}

const useFullscreenSpinner = create<State & Actions>((set) => ({
  label: "Mohon tunggu hingga proses selesai",
  setLabel: (newState) => set({ label: newState }),
  isOpen: false,
  onFullscreenSpinnerOpen: () =>
    set({
      isOpen: true,
    }),
  onFullscreenSpinnerClose: () =>
    set({
      isOpen: false,
    }),
}));

export default useFullscreenSpinner;
