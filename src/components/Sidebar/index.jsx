import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import { BarChart2, LogOut, TrendingUp, Menu } from "lucide-react";

const SIDEBAR = [
  { name: "Overview", icon: BarChart2, color: "#6366F1", path: "/overview" },
  {
    name: "Challenges",
    icon: TrendingUp,
    color: "#EC4899",
    path: "/challenges",
  },
  { name: "Sign Out", icon: LogOut, color: "#3B82F6", path: "/signout" },
];

const Sidebar = () => {
  const [isSidebarOpen, toggleSideBar] = useState(false);
  return (
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
        <nav className="mt-8 flex-grow">
          {SIDEBAR.map((eachItem) => (
            <Link key={eachItem.path} to={eachItem.path}>
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
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
