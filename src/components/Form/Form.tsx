import { Dispatch, FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

import { useForm, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { fetchUsers } from "../../services/fetchUsers";
import { IUser } from "../../types/user";

type Inputs = {
  login: string;
  password: string;
  passwordRepeat: string;
  name: string;
  customError: string;
};

const role: IUser["role"] = "user";

const Form = () => {
  const [sex, setSex] = useState<typeSex>("male");
  const [birthday, setBirthday] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<Inputs>({
    defaultValues: {
      login: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dbUsers = await fetchUsers.getUsers();
    //

    const currentUser = dbUsers.find((user: IUser) => user.login === data.login);
    if (currentUser) {
      setError("login", { type: "custom", message: "this login is already registered" }, { shouldFocus: true });
    } else {
      const { login, password, name } = { ...data };
      const userBirthday = birthday?.toLocaleDateString();
      const userData = {
        login: login.toLowerCase(),
        password,
        name,
        sex,
        role,
        birthday: userBirthday,
        banned: false,
      };

      fetchUsers
        .addUser(userData)
        .then(() => {
          toast.success("account successfully created");
          navigate("/login");
        })
        .catch(() => {
          toast.error("error");
        });
    }
  };

  // const pas = watch("passwordRepeat")

  useEffect(() => {
    if (watch("password") !== watch("passwordRepeat") && dirtyFields.passwordRepeat) {
      setError("customError", { type: "custom", message: "Passwords don't match" });
    } else {
      clearErrors("customError");
    }
  }, [watch("passwordRepeat"), watch("password")]);

  return (
    <>
      <Helmet>
        <title>Signup | My Form</title>
      </Helmet>

      <div className="w-[360px] m-auto p-4   ">
        <p className="text-white text-2xl mt-5  text-center">Signup</p>
        <form className="grid mb-5 mt-5  gap-1" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="px-4 py-2 border mt-3 rounded-md"
            placeholder="login*"
            {...register("login", {
              required: "This field is required",
              maxLength: {
                value: 28,
                message: "Max length has been 28",
              },
            })}
          />
          {errors.login && <span>{errors.login.message}</span>}

          <input
            className="px-4 py-2 border mt-3 rounded-md"
            placeholder="password*"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "MinLength can be: 4",
              },
              maxLength: {
                value: 28,
                message: "Max length has been 28",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <input
            className="px-4 py-2 border mt-3 rounded-md"
            placeholder="repeat password*"
            type="password"
            {...register("passwordRepeat", { required: "This field is required" })}
          />
          {errors.customError && <span>{errors.customError.message}</span>}
          <input
            className="px-4 py-2 border mt-3 rounded-md"
            placeholder="name*"
            {...register("name", {
              required: "This field is required",
              maxLength: { value: 28, message: "Max length has been 28" },
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <ChooseSex sex={sex} setSex={setSex} />
          <Choosedate birthday={birthday} setBirthday={setBirthday} />

          <button
            className="px-4 py-2 border mt-6 rounded-md text-xl text-white hover:bg-white hover:text-red-500 duration-300"
            type="submit"
          >
            Create
          </button>
        </form>
        <Link to="/login">Back to login</Link>
      </div>
    </>
  );
};

type ChoosedateProps = {
  birthday: Date | null;
  setBirthday: Dispatch<React.SetStateAction<Date | null>>;
};

const Choosedate: FC<ChoosedateProps> = ({ birthday, setBirthday }) => {
  // const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      className="px-4 py-2 border mt-3 rounded-md w-full"
      placeholderText="date of birth"
      selected={birthday}
      showYearDropdown
      dateFormatCalendar="MMMM"
      yearDropdownItemNumber={70}
      scrollableYearDropdown
      onChange={(date: Date) => setBirthday(date)}
    />
  );
};

type typeSex = "male" | "female";

type ChooseSexProps = {
  sex: typeSex;
  setSex: Dispatch<React.SetStateAction<typeSex>>;
};

const ChooseSex: FC<ChooseSexProps> = ({ sex, setSex }) => {
  // const [sex, setSex] = useState<typeSex>("male");

  const ChangeHandler = (sex: typeSex) => {
    setSex(sex);
    console.log(sex);
  };

  return (
    <div className="flex gap-x-14 mt-3  text-white">
      <div>
        <label className="mr-2" htmlFor="male">
          male
        </label>
        <input onChange={() => ChangeHandler("male")} checked={sex === "male"} name="male" type="checkbox" />
      </div>

      <div>
        <label className="mr-2" htmlFor="female">
          female
        </label>
        <input onChange={() => ChangeHandler("female")} name="female" type="checkbox" checked={sex === "female"} />
      </div>
    </div>
  );
};

export default Form;
