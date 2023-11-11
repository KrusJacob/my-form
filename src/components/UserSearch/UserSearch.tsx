import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useSearchStore } from "../../store/search";

const UserSearch = () => {
  const [temp, setTemp] = useState<string>("");
  const changeTemp = useSearchStore((state) => state.changeTemp);

  const debounce = useDebounce(temp);

  useEffect(() => {
    changeTemp(debounce);
  }, [debounce]);

  return (
    <div className="w-1/2 flex justify-between border rounded border-black">
      <input
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        placeholder="search user... (login/name)"
        className="w-full px-2 py-1 rounded"
      />
      <button
        onClick={() => setTemp("")}
        className="px-2 border bg-white hover:bg-red-500 hover:text-white rounded duration-100"
      >
        &#10006;
      </button>
    </div>
  );
};

export default UserSearch;
