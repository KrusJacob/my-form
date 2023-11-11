import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IUser } from "../../types/user";
import { fetchUsers } from "../../services/fetchUsers";
import { useUsersStore } from "../../store/user";

type Inputs = {
  login: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const userLogined = useUsersStore((state) => state.userLogined);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //
    const dbUsers = await fetchUsers.getUsers();
    //

    const currentUser: IUser = dbUsers.find((user: IUser) => user.login === data.login);

    if (!currentUser) {
      setError("root", { type: "loginError", message: "login not found" });
      return;
    } else {
      const currentPassword = currentUser.password === data.password;
      if (!currentPassword) {
        setError("root", { type: "PasswordError", message: "invalid password" });
        resetField("password");
        return;
      }
    }
    if (currentUser.banned) {
      toast.error("you account is banned");
    } else {
      navigate("/");
      userLogined(currentUser);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | My Form</title>
      </Helmet>
      <div className="w-[360px] m-auto p-4 text-center">
        <p className="text-white text-2xl mt-5">Login</p>
        <form className="grid mt-5 gap-1" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="px-4 py-2 border mt-3 rounded-md"
            placeholder="login"
            {...register("login", { required: true })}
          />
          {errors.login && <span>This field is required</span>}
          {errors.root && errors.root.type === "loginError" && <span>{errors.root.message}</span>}

          <input
            className="px-4 py-2 border mt-3 rounded-md"
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          {errors.root && errors.root.type === "PasswordError" && <span>{errors.root.message}</span>}

          <button
            className="px-4 py-2 border mt-6 rounded-md text-xl text-white hover:bg-white hover:text-red-500 duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-between">
          <Link to="/login/signup">Create account</Link>
          <Link to="/login/pass_recovery">I am forgot password</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
