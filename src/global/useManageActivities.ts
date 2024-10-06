import { create } from "zustand";

interface State {
  manageActivities: boolean;
}

interface Actions {
  toggleManageActivities: () => void;
  onCloseManageActivities: () => void;
}

const useManageActivities = create<State & Actions>((set) => ({
  manageActivities: false,
  toggleManageActivities: () =>
    set((ps) => ({
      manageActivities: !ps.manageActivities,
    })),
  onCloseManageActivities: () => set({ manageActivities: false }),
}));

export default useManageActivities;
