import { create } from "zustand";

interface State {
  label: string;
  isOpen: boolean;
}

interface Actions {
  setLabelFixedFullscreenSpinner: (newState: State["label"]) => void;
  resetLabelFixedFullscreenSpinner: (newState: State["label"]) => void;
  onOpenFixedFullscreenSpinner: () => void;
  onCloseFixedFullscreenSpinner: () => void;
}

const defaultLabel = "Mohon tunggu hingga proses selesai";

const useFixedFullscreenSpinner = create<State & Actions>((set) => ({
  label: defaultLabel,
  setLabelFixedFullscreenSpinner: (newState) => set({ label: newState }),
  resetLabelFixedFullscreenSpinner: () => set({ label: defaultLabel }),
  isOpen: false,
  onOpenFixedFullscreenSpinner: () =>
    set({
      isOpen: true,
    }),
  onCloseFixedFullscreenSpinner: () =>
    set({
      isOpen: false,
    }),
}));

export default useFixedFullscreenSpinner;
