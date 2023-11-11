import { create } from "zustand";
import { IUser } from "../types/user";

export const KEY_USER = "KEY_MY_FORM_USER";

interface userState {
  user: IUser;
  login: boolean;
  userLogined: (user: IUser) => void;
  userLogout: () => void;
  editUser: (user: any) => void;
}

const getUser = () => {
  return JSON.parse(localStorage.getItem(KEY_USER) || "null");
};

export const useUsersStore = create<userState>()((set) => ({
  user: getUser(),
  login: false,
  userLogined: (user) =>
    set(() => {
      localStorage.setItem(KEY_USER, JSON.stringify(user));
      return { login: true, user };
    }),
  userLogout: () =>
    set(() => {
      localStorage.removeItem(KEY_USER);
      return { login: false, user: undefined };
    }),
  editUser: (modifiedValues) =>
    set((state) => {
      const editedUser = { ...state.user, ...modifiedValues };
      localStorage.setItem(KEY_USER, JSON.stringify(editedUser));
      return { ...state, user: editedUser };
    }),
}));
