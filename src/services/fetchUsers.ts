import { IUser } from "../types/user";

const URL = "https://users-my-form.onrender.com/users";

export const fetchUsers = {
  getUsers: async () => {
    return await fetch(`${URL}`).then((data) => data.json());
  },

  addUser: async (user: IUser) => {
    await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  },

  giveAdminRole: async (id: number) => {
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ role: "admin" }),
    });
  },

  removeAdminRole: async (id: number) => {
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ role: "user" }),
    });
  },
  banUser: async (id: number) => {
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ banned: true }),
    });
  },
  unBanUser: async (id: number) => {
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ banned: false }),
    });
  },

  editUser: async (id: number, value: any) => {
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(value),
    });
  },
};
