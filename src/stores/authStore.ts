import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface authStoreObj {
  user: UserObj | null;
  token: string | null;
  loggedIn: boolean | null;

  logIn(user: UserObj, token: string): void;

  logOut(): void;
}

const authStore = createStore<authStoreObj>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loggedIn: false,
      logIn(user, token) {
        set((prev) => ({
          ...prev,
          user: user,
          token: token,
          loggedIn: !!(user && token),
        }));
      },
      logOut() {
        set((prev) => ({ ...prev, loggedIn: false, user: null, token: null }));
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default authStore;
