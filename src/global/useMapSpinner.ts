import { create } from "zustand";

interface State {
  label: string;
  isOpen: boolean;
}

interface Actions {
  setLabelMapSpinner: (newState: State["label"]) => void;
  onOpenMapSpinner: () => void;
  onCloseMapSpinner: () => void;
}

const useMapSpinner = create<State & Actions>((set) => ({
  label: "Mohon tunggu hingga proses selesai",
  setLabelMapSpinner: (newState) => set({ label: newState }),
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
