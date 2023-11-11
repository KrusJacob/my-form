import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUsersStore } from "../../store/user";

const navItems = [
  { label: "Profile", path: "/profile" },
  // { label: "Logout", path: "/login" },
];

// logout

const Navigation = () => {
  const navigate = useNavigate();
  const logout = useUsersStore((state) => state.userLogout);
  const userRole = useUsersStore((state) => state.user?.role);

  const logoutHandler = () => {
    logout();
  };

  return (
    <header className="w-full bg-[var(--redColor)] px-10  flex justify-between items-center text-white ">
      <h2 onClick={() => navigate("/")} className="text-center inline-block text-7xl cursor-pointer">
        Axio
      </h2>
      <nav className="flex gap-10">
        {userRole === "admin" && (
          <NavLink to="/admin" className="">
            {({ isActive }) => (
              <div className={`${isActive ? "active" : ""}  text-3xl leading-[5rem] p-2`}>Admin</div>
            )}
          </NavLink>
        )}

        {navItems.map((item) => (
          <NavLink key={item.label} to={item.path} className="">
            {({ isActive }) => (
              <div className={`${isActive ? "active" : ""} text-3xl leading-[5rem] p-2 `}>{item.label}</div>
            )}
          </NavLink>
        ))}
        <Link className="text-3xl  leading-[5rem] p-2" to="/login" onClick={logoutHandler}>
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
