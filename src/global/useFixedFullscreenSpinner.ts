import { create } from "zustand";

interface State {
  label: string;
  isOpen: boolean;
}

interface Actions {
  setLabelFixedFullscreenSpinner: (newState: State["label"]) => void;
  onOpenFixedFullscreenSpinner: () => void;
  onCloseFixedFullscreenSpinner: () => void;
}

const useFixedFullscreenSpinner = create<State & Actions>((set) => ({
  label: "Mohon tunggu hingga proses selesai",
  setLabelFixedFullscreenSpinner: (newState) => set({ label: newState }),
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
