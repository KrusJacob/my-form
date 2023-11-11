import useFilter from "../../hooks/useFilter";
import { useFilterStore } from "../../store/filter";
import { useSearchStore } from "../../store/search";
import { IUser } from "../../types/user";
import UserItem from "../UserItem/UserItem";

const UserList = ({ users, refetch }: { users: IUser[]; refetch: () => void }) => {
  const temp = useSearchStore((state) => state.temp);
  const activeFilter = useFilterStore((state) => state.filter);

  const filteredUsers = useFilter(users, temp, activeFilter);

  return (
    <>
      <table className="w-full ">
        <tbody>
          <tr className="flex border-b-2 border-b-red-500 bg-slate-100">
            <td className="border w-1/4 text-center">ID</td>
            <td className="border w-full text-center">Login</td>
            <td className="border w-full text-center">Name</td>
            <td className="border w-full text-center">Password</td>
            <td className="border w-1/3 text-center">Sex</td>
            <td className="border w-1/2 text-center">Birthday</td>
            <td className="border w-1/5 text-center cursor-pointer"></td>
          </tr>
          {filteredUsers.map((user) => (
            <UserItem user={user} key={user.id} refetch={refetch} />
          ))}
        </tbody>
      </table>
      {!filteredUsers.length && <p className="text-center mt-5 text-4xl text-slate-700">Users not found</p>}
    </>
  );
};

export default UserList;
