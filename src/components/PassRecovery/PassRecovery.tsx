import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../../services/fetchUsers";
import { IUser } from "../../types/user";

type Inputs = {
  login: string;
  password: string;
  passwordRepeat: string;
  customError: string;
};

const PassRecovery = () => {
  const [isLoginSubmit, setIsLoginSubmit] = useState(false);
  const [user, setUser] = useState<IUser>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    resetField,
    watch,
    setError,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<Inputs>({
    defaultValues: {
      login: "",
      password: "",
      passwordRepeat: "",
    },
  });

  useEffect(() => {
    if (watch("password") !== watch("passwordRepeat") && dirtyFields.passwordRepeat) {
      setError("customError", { type: "custom", message: "Passwords don't match" });
    } else {
      clearErrors("customError");
    }
  }, [watch("passwordRepeat"), watch("password")]);

  const checkLogin = async () => {
    const dbUsers = await fetchUsers.getUsers();
    const currentUser: IUser = dbUsers.find((user: IUser) => user.login === getValues("login"));
    if (currentUser) {
      setIsLoginSubmit(true);
      setUser(currentUser);
    } else {
      toast.error("this login is not found");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    resetField("password");
    resetField("passwordRepeat");
    fetchUsers.editUser(user?.id!, { password: data.password });
    toast.success("password changed successfully");

    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>Password recovery | My Form</title>
      </Helmet>
      <div className="w-[360px] m-auto p-4 text-center">
        <p className="text-white text-2xl mt-5">{!isLoginSubmit ? "Enter your login" : "Enter new password"}</p>
        <form className="grid mt-5 gap-1" onSubmit={handleSubmit(onSubmit)}>
          {!isLoginSubmit ? (
            <input
              {...register("login", {
                required: "This field is required",
              })}
              className="px-4 py-2 border mt-3 rounded-md"
              required
              placeholder="login"
            />
          ) : (
            <>
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
            </>
          )}
          {!isLoginSubmit ? (
            <button
              className="px-4 py-2 w-full border mt-6 rounded-md text-xl text-white hover:bg-white hover:text-red-500 duration-300"
              onClick={checkLogin}
              type="button"
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 w-full border mt-6 rounded-md text-xl text-white hover:bg-white hover:text-red-500 duration-300"
              type="submit"
            >
              Confirm
            </button>
          )}
        </form>

        <div className="mt-4 flex justify-between text-white">
          <button className="disabled:opacity-0" onClick={() => setIsLoginSubmit(false)} disabled={!isLoginSubmit}>
            Back
          </button>
          <Link to="/login">Go to login</Link>
        </div>
      </div>
    </>
  );
};

export default PassRecovery;
