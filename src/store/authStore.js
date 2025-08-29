import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,       // user info
  token: null,      // auth token
  loading: false,   // loading state
  error: null,      // error messages

  // login function
  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, error: null });
  },

  // logout function
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  // initialize state from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      set({ user, token });
    }
  },
}));

export default useAuthStore;
