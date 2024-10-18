import { create } from "zustand";

interface State {
  label: string;
  isOpen: boolean;
}

interface Actions {
  setLabelMapSpinner: (newState: State["label"]) => void;
  resetLabelMapSpinner: () => void;
  onOpenMapSpinner: () => void;
  onCloseMapSpinner: () => void;
}

const defaultLabel = "Mohon tunggu hingga proses selesai";

const useMapSpinner = create<State & Actions>((set) => ({
  label: defaultLabel,
  setLabelMapSpinner: (newState) => set({ label: newState }),
  resetLabelMapSpinner: () => set({ label: defaultLabel }),
  isOpen: false,
  onOpenMapSpinner: () =>
    set({
      isOpen: true,
    }),
  onCloseMapSpinner: () =>
    set({
      isOpen: false,
    }),
}));

export default useMapSpinner;
