import { useState } from "react";
import toast from "react-hot-toast";
import { fetchUsers } from "../../services/fetchUsers";
import { useUsersStore } from "../../store/user";
import { IUser } from "../../types/user";

const UserItem = ({ user, refetch }: { user: IUser; refetch: () => void }) => {
  const [showInfo, setShowInfo] = useState(false);
  const currentUser = useUsersStore((state) => state.user);

  const giveAdminRoleHandler = () => {
    fetchUsers.giveAdminRole(user.id!).then(() => refetch());
    toast.success("role 'admin' added");
  };
  const removeAdminRoleHandler = () => {
    fetchUsers.removeAdminRole(user.id!).then(() => refetch());
    toast.success("role 'admin' removed");
  };

  const banUser = () => {
    fetchUsers.banUser(user.id!).then(() => refetch());
    toast.success("user banned");
  };
  const unBanUser = () => {
    fetchUsers.unBanUser(user.id!).then(() => refetch());
    toast.success("user unbanned");
  };

  return (
    <>
      <tr className={`flex w-full ${user.banned ? "text-blue-700 opacity-70" : ""}`}>
        <td className={`${user.role === "admin" ? "text-red-500" : ""} border w-1/4 text-center`}>{user.id}</td>
        <td className="border w-full text-center">{user.login}</td>
        <td className="border w-full text-center">{user.name}</td>
        <td className="border w-full text-center"> {user.password}</td>
        <td className="border w-1/3 text-center">{user.sex}</td>
        <td className="border w-1/2 text-center"> {user.birthday}</td>
        <td className="border w-1/5 text-center cursor-pointer">
          <button
            disabled={currentUser?.id === user.id}
            className="w-full disabled:opacity-0"
            onClick={() => setShowInfo((status) => !status)}
          >
            &#9776;
          </button>
        </td>
      </tr>
      {showInfo && (
        <div className=" bg-[var(--redColor)] p-2 flex justify-center gap-8  text-white">
          {user.role === "admin" ? (
            <button onClick={removeAdminRoleHandler} className="px-2 py-1 border hover:bg-red-400  duration-200">
              Remove role admin
            </button>
          ) : (
            <button onClick={giveAdminRoleHandler} className="px-2 py-1 border hover:bg-red-400  duration-200">
              Give role admin
            </button>
          )}
          {user.banned ? (
            <button onClick={unBanUser} className="px-6 py-1 border hover:bg-red-400 duration-200">
              Unban
            </button>
          ) : (
            <button onClick={banUser} className="px-6 py-1 border hover:bg-red-400 duration-200">
              Ban
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default UserItem;
