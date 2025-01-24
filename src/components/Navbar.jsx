import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
 
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const themeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  const handleLogOut = () => {
    logoutUser()
      .then(() => console.log("User logged out!"))
      .catch((error) => console.log("Error during logout:", error.message));
  };


  const links = (
    <ul className="menu flex flex-col lg:flex-row gap-4 text-lg">
      <li>
        <NavLink to="/" className="hover:text-lime-400">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-visas" className="hover:text-lime-400">
          All Visas
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-visa" className="hover:text-lime-400">
          Add Visa
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-added-visas" className="hover:text-lime-400">
          My Added Visas
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-applications" className="hover:text-lime-400">
          My Applications
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div>
          <Link className="flex items-center space-x-2 text-white">
            <div className="bg-white text-indigo-600 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Visa Navigator</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex">{links}</div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center bg-white dark:bg-gray-800 p-1 rounded-full shadow cursor-pointer"
            onClick={themeToggle}
          >
            <div
              className={`${
                theme === "dark" ? "translate-x-6" : "translate-x-1"
              } w-5 h-5 bg-indigo-500 dark:bg-yellow-300 rounded-full transform transition-transform duration-300`}
            ></div>
          </div>

         
          {user ? (
  <div className="relative group">
    <img
      src={user.photoURL}
      alt="User Avatar"
      className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
    />
    <div
      className="absolute hidden group-hover:flex group-focus-within:flex flex-col items-start right-0 mt-2 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg z-10 w-48"
    >
      <p className="text-gray-800 dark:text-gray-200 mb-3 truncate">
        {user.displayName}
      </p>
      <button
        onClick={handleLogOut}
        className="w-full text-sm text-white bg-purple-600 hover:bg-purple-700 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  </div>
) : (
  <div className="flex items-center gap-3">
    <NavLink
      to="/login"
      className="px-4 py-2 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded transition"
    >
      Login
    </NavLink>
    <NavLink
      to="/register"
      className="px-4 py-2 text-sm text-white bg-purple-500 hover:bg-purple-600 rounded transition"
    >
      Register
    </NavLink>
  </div>
)}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden bg-white dark:bg-gray-900 py-2 px-4">
        {links}
      </div>
    </nav>
  );
};

export default Navbar;
