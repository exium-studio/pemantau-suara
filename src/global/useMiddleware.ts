import { create } from "zustand";

interface State {
  authToken: string;
  role: object | null;
}

interface Actions {
  setAuthToken: (newState: State["authToken"]) => void;
  setRole: (newState: State["authToken"]) => void;
}

const useMiddleware = create<State & Actions>((set) => ({
  authToken: "",
  setAuthToken: (newState) =>
    set(() => ({
      authToken: newState,
    })),

  role: {},
  setRole: (newState) =>
    set(() => ({
      authToken: newState,
    })),
}));

export default useMiddleware;
