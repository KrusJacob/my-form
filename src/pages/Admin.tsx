import { Helmet } from "react-helmet";

import { useState } from "react";
import UserFilter from "../components/UserFilters/UserFilter";

import UserList from "../components/UserList/UserList";
import UserSearch from "../components/UserSearch/UserSearch";
import { fetchUsers } from "../services/fetchUsers";
import { IUser } from "../types/user";

const Admin = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    const dbUsers = await fetchUsers.getUsers();
    setUsers(dbUsers);
  };

  return (
    <>
      <Helmet>
        <title>Admin | My Form</title>
      </Helmet>
      <div className="mt-10">
        <div className="border-4 mt-4 bg-slate-200 bg-opacity-70 backdrop-blur border-[var(--redColor)] m-auto rounded-lg max-w-[970px] max-h-[850px]">
          <div className="bg-[var(--redColor)] w-full text-center px-6 py-1 text-3xl text-white flex">
            <h3 className="text-center text-4xl text-red-white">Admin panel</h3>
            <button
              onClick={getUsers}
              className="border-white  hover:bg-white hover:text-red-500 duration-300 border rounded px-2 py-1 ml-auto"
            >
              Get all users
            </button>
          </div>
          <div className="flex justify-between gap-5 p-2">
            <UserSearch />
            <UserFilter />
          </div>
          <div className="h-[600px] overflow-x-auto">
            <UserList refetch={getUsers} users={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
