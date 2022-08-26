import { createPersistStore } from "zustand-store";

export interface Asset {
  srcIcon: string;
  value: string;
  valueFormatted: string;
  balance: number;
  id: string;
}
interface AuthenState {
  isLoggedIn: boolean;
  password: string;
  assets: Asset[];
}

interface AuthenActions {
  handleCheckFlowLoggedIn: (cb: () => void) => void;
  handleChangePassword: (password: string) => void;
}

const initialState: AuthenState = {
  isLoggedIn: false,
  password: "",
  assets: [],
};

export const [useAuthenStore] = createPersistStore<AuthenState & AuthenActions>(
  (set, get) => ({
    ...initialState,
    handleCheckFlowLoggedIn: (cb) => {
      const isLoggedIn = "axsmaidinh".localeCompare(get().password) === 0;
      set({
        isLoggedIn,
      });
      if (isLoggedIn && typeof cb === "function") {
        cb();
      }
    },
    handleChangePassword: (password) => set({ password }),
  }),
  "useAuthenStore"
);
