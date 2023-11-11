import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import PassRecovery from "./components/PassRecovery/PassRecovery";
import LoginLayout from "./layout/LoginLayout";
import MainLayout from "./layout/MainLayout";
import Admin from "./pages/Admin";

import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import { useUsersStore } from "./store/user";

function App() {
  const user = useUsersStore((state) => state.user);

  console.log(user);

  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />} />
          </Route>
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<Login />} />
            <Route path="/login/signup" element={<Form />} />
            <Route path="/login/pass_recovery" element={<PassRecovery />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </HashRouter>
  );
}

export default App;
