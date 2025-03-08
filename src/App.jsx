import {
  replace,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Overview from "./components/Overview";
import Challenges from "./components/Challenges";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import SignoutModal from "./components/SignoutModal";
import SignupVerification from "./components/SignupVerification";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Loading from "./components/Loading";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.isVerified) {
      navigate("/overview", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login", { replace: true });
    }
    if (!user.isVerified) {
      return navigate("/verify-email", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);
  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/signup", "/verify-email"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Register />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          exact
          path="/overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/challenges"
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/signout"
          element={
            <ProtectedRoute>
              <SignoutModal />
            </ProtectedRoute>
          }
        />
        <Route exact path="verify-email" element={<SignupVerification />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
