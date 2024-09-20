import { create } from "zustand";

interface State {
  isAdmin: boolean;
}

interface Actions {
  setIsAdmin: () => void;
}

const useAuth = create<State & Actions>((set) => ({
  isAdmin: false,
  setIsAdmin: () =>
    set((ps) => ({
      isAdmin: !ps.isAdmin,
    })),
}));

export default useAuth;
