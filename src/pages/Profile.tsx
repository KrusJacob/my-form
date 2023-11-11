import { useState } from "react";
import Select from "react-select";
import { Helmet } from "react-helmet";
import { useUsersStore } from "../store/user";
import { fetchUsers } from "../services/fetchUsers";

import toast from "react-hot-toast";

const options = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
];

const Profile = () => {
  const user = useUsersStore((state) => state.user);
  const editUser = useUsersStore((state) => state.editUser);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState({
    name: user?.name,
    sex: user?.sex,
    birthday: user?.birthday,
    password: user?.password,
  });
  const [prevValue, setPrevValue] = useState(value);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const EditHandler = () => {
    setPrevValue(value);
    setIsEdit(true);
  };

  const cancelHandler = () => {
    setValue(prevValue);
    setIsEdit(false);
  };

  const saveHandler = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers.editUser(user.id!, value);

    editUser(value);
    setIsEdit(false);
    toast.success("changes have been successfully applied");
  };

  return (
    <>
      <Helmet>
        <title>Profile | My Form</title>
      </Helmet>

      <div className="mt-10">
        <div className="border-4 border-[var(--redColor)]  bg-slate-200 bg-opacity-70 backdrop-blur m-auto rounded-lg max-w-[970px] max-h-[500px] ">
          <div className="bg-[var(--redColor)] py-2 px-6">
            <h4 className=" text-4xl text-white">Profile info</h4>
          </div>
          <div className="">
            <form onSubmit={saveHandler} id="profile" className="text-2xl p-5 ">
              <h3 className="font-bold mb-2">{user?.role === "admin" ? "Admin" : "User"}</h3>
              <div className="flex flex-col gap-2">
                <p>
                  <span className="inline-block w-[120px]"> login:</span> {user?.login}
                </p>
                <div>
                  <span className="inline-block w-[120px]"> name:</span>

                  <input
                    className="px-2 py-1 rounded"
                    onChange={changeHandler}
                    required
                    name="name"
                    readOnly={!isEdit}
                    disabled={!isEdit}
                    value={value.name}
                  ></input>
                </div>
                <div>
                  <span className="inline-block w-[120px]"> sex:</span>
                  {isEdit ? (
                    <Select
                      className="inline-block disabled:bg-white"
                      isDisabled={!isEdit}
                      defaultInputValue={value.sex}
                      name="sex"
                      onChange={(e) =>
                        setValue((prev) => ({
                          ...prev,
                          sex: e!.value as any,
                        }))
                      }
                      options={options}
                    />
                  ) : (
                    <input
                      className="px-2 py-1 rounded"
                      onChange={changeHandler}
                      name="sex"
                      readOnly={!isEdit}
                      disabled={!isEdit}
                      value={value.sex}
                    ></input>
                  )}
                </div>
                <div>
                  <span className="inline-block w-[120px]"> birthday:</span>
                  <input
                    className="px-2 py-1 rounded"
                    onChange={changeHandler}
                    pattern="\d{2}\.\d{2}\.[1-2][09][0-9][0-9]"
                    name="birthday"
                    required
                    readOnly={!isEdit}
                    disabled={!isEdit}
                    value={value.birthday}
                  ></input>
                </div>
                <div>
                  <span className="inline-block w-[120px]"> password:</span>
                  <input
                    className="px-2 py-1 rounded"
                    type="password"
                    onChange={changeHandler}
                    name="password"
                    required
                    readOnly={!isEdit}
                    disabled={!isEdit}
                    value={value.password}
                  ></input>
                </div>
              </div>
              {!isEdit ? (
                <button
                  onClick={EditHandler}
                  className="px-2 py-1 border mt-4 bg-white border-red-500 rounded hover:bg-red-500 hover:text-white duration-200"
                >
                  Edit profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={cancelHandler}
                    className="px-2 py-1 border mt-4 bg-white border-red-500 rounded hover:bg-red-500 hover:text-white duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="profile"
                    // onClick={saveHandler}
                    className="px-2 py-1 border mt-4 bg-white border-green-500 rounded hover:bg-green-500 hover:text-white duration-200"
                  >
                    Save changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
