import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const MainLayout = () => {
  return (
    <div className="bg-home h-screen">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;
