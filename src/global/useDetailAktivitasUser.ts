import { create } from "zustand";

interface State {
  detailAktivitasUser: any;
}

interface Actions {
  setDetailAktivitasUser: (newState: State["detailAktivitasUser"]) => void;
}

const useDetailAktivitasUser = create<State & Actions>((set) => ({
  detailAktivitasUser: undefined,
  setDetailAktivitasUser: (newState) =>
    set({
      detailAktivitasUser: newState,
    }),
}));

export default useDetailAktivitasUser;
