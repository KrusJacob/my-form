import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="h-screen bg-login px-4 py-10 ">
      <h1 className="text-center text-8xl text-white">Axio</h1>
      <div className="h-2 w-[380px] bg-white m-auto" />
      <Outlet />
    </div>
  );
};

export default LoginLayout;
