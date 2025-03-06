import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Overview from "./components/Overview";
import Challenges from "./components/Challenges";
import Sidebar from "./components/Sidebar";
import User from "./components/User";

const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/register"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/overview" element={<Overview />} />
        <Route exact path="/challenges" element={<Challenges />} />
        <Route exact path="/user" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
