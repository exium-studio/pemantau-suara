import { create } from "zustand";

interface State {
  manageUsers: boolean;
}

interface Actions {
  toggleManageUsers: () => void;
  onCloseManageUsers: () => void;
}

const useManageUsers = create<State & Actions>((set) => ({
  manageUsers: false,
  toggleManageUsers: () =>
    set((ps) => ({
      manageUsers: !ps.manageUsers,
    })),
  onCloseManageUsers: () => set({ manageUsers: false }),
}));

export default useManageUsers;
