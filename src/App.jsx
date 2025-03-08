import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Overview from "./components/Overview";
import Challenges from "./components/Challenges";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import SignoutModal from "./components/SignoutModal";
import SignupVerification from "./components/SignupVerification";

const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/signup", "/verify-email"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/overview" element={<Overview />} />
        <Route exact path="/challenges" element={<Challenges />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/signout" element={<SignoutModal />} />
        <Route exact path="verify-email" element={<SignupVerification />} />
      </Routes>
    </div>
  );
};

export default App;
