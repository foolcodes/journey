import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Overview from "./components/Overview";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

const App = () => {
  const location = useLocation();

  // Define routes where Sidebar should not be shown
  const noSidebarRoutes = ["/", "/login", "/register"];

  // Check if current route requires Sidebar
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/overview" element={<Overview />} />
        <Route exact path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
