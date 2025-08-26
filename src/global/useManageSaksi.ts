import { create } from "zustand";

interface State {
  manageSaksi: boolean;
}

interface Actions {
  toggleManageSaksi: () => void;
  onCloseManageSaksi: () => void;
}

const useManageSaksi = create<State & Actions>((set) => ({
  manageSaksi: false,
  toggleManageSaksi: () =>
    set((ps) => ({
      manageSaksi: !ps.manageSaksi,
    })),
  onCloseManageSaksi: () => set({ manageSaksi: false }),
}));

export default useManageSaksi;
