import { useFilterStore } from "../../store/filter";
import { TypeFilters } from "../../types/filter";

const UserFilter = () => {
  const activeFilter = useFilterStore((state) => state.filter);
  const changeFilter = useFilterStore((state) => state.changeFilter);

  const changeFilterHandler = (filter: TypeFilters) => {
    changeFilter(filter);
  };

  const classBtnActive = {
    all: "bg-green-500 hover:text-white ",
    admins: "bg-red-500 hover:text-white ",
    banneds: "bg-blue-500 hover:text-white ",
  };

  return (
    <div className="w-1/2 flex gap-3 items-center ">
      <p className="text-xl opacity-50">Filter :</p>
      <button
        onClick={() => changeFilterHandler("all")}
        className={`border border-black px-2 py-1 rounded hover:${classBtnActive.all} duration-300 ${
          activeFilter === "all" ? classBtnActive.all : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => changeFilterHandler("admins")}
        className={`border border-black px-2 py-1 rounded hover:${classBtnActive.admins} duration-300 ${
          activeFilter === "admins" ? classBtnActive.admins : ""
        }`}
      >
        Admins
      </button>
      <button
        onClick={() => changeFilterHandler("banneds")}
        className={`border border-black px-2 py-1 rounded hover:bg-blue-500 hover:text-white duration-300 ${
          activeFilter === "banneds" ? classBtnActive.banneds : ""
        }`}
      >
        Banneds
      </button>
    </div>
  );
};

export default UserFilter;
