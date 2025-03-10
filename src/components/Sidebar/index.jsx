import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart2, LogOut, TrendingUp, Menu, User, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const SIDEBAR = [
  { name: "Overview", icon: BarChart2, color: "#6366F1", path: "/overview" },
  {
    name: "Challenges",
    icon: TrendingUp,
    color: "#EC4899",
    path: "/challenges",
  },
  { name: "Sign Out", icon: LogOut, color: "#3B82F6", action: "signout" },
];

const Sidebar = () => {
  const [isSidebarOpen, toggleSideBar] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const { logout, error } = useAuthStore();

  const handleSignOut = () => {
    logout();
    setShowSignOutModal(false);
  };

  const handleItemClick = (item) => {
    if (item.action === "signout") {
      setShowSignOutModal(true);
    }
  };

  return (
    <>
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 230 : 80 }}
      >
        <div className="h-full bg-[#111827] bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleSideBar(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit cursor-pointer"
          >
            <Menu size={24} color="white" />
          </motion.button>
          <nav className="mt-8 flex-grow flex flex-col justify-between">
            <div>
              {SIDEBAR.map((eachItem) => (
                <div key={eachItem.name}>
                  {eachItem.path ? (
                    <Link to={eachItem.path}>
                      <motion.div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                        <eachItem.icon
                          size={20}
                          style={{ color: eachItem.color, minWidth: "20px" }}
                        />
                        <AnimatePresence>
                          {isSidebarOpen && (
                            <motion.span
                              className="ml-4 whitespace-nowrap text-gray-100"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2, delay: 0.3 }}
                            >
                              {eachItem.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.div
                      className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer"
                      onClick={() => handleItemClick(eachItem)}
                    >
                      <eachItem.icon
                        size={20}
                        style={{ color: eachItem.color, minWidth: "20px" }}
                      />
                      <AnimatePresence>
                        {isSidebarOpen && (
                          <motion.span
                            className="ml-4 whitespace-nowrap text-gray-100"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                          >
                            {eachItem.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <Link key={"/user"} to={"/user"}>
              <motion.div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <User size={20} style={{ color: "green", minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap text-gray-100"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {"Profile"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </nav>
        </div>
      </motion.div>

      {/* Sign Out Modal */}
      <AnimatePresence>
        {showSignOutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowSignOutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Sign Out</h3>
                <button
                  onClick={() => setShowSignOutModal(false)}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X size={20} color="white" />
                </button>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to sign out?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSignOutModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
                {error && (
                  <p className="text-red-500 text-sm font-semibold mb-3">
                    {error}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
