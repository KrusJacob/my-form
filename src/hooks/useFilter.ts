import { IUser } from "../types/user";

const useFilter = (users: IUser[], temp: string, activeFilter: string) => {
  const searchUsers = users.filter(
    (user) =>
      user.login.toLocaleLowerCase().includes(temp.toLocaleLowerCase()) ||
      user.name?.toLocaleLowerCase().includes(temp.toLocaleLowerCase())
  );

  const filterUsers = (users: IUser[]) => {
    if (activeFilter === "admins") {
      return users.filter((user) => user.role === "admin");
    }
    if (activeFilter === "banneds") {
      return users.filter((user) => user.banned);
    }
    return users;
  };

  return filterUsers(searchUsers);
};

export default useFilter;
