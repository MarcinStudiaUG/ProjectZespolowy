import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AvatarMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => loginWithRedirect({
            authorizationParams: {
              screen_hint: "signup"
            }
          })}
        >
          Register
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={user?.picture || "/default-avatar.png"}
        alt={user?.name}
        className="w-16 h-16 rounded-full cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <ul>
            <li className="p-2 text-black">Hello, {user?.nickname}</li>
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer text-black"
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/profile" className="block w-full h-full">
                Profile
              </Link>
            </li>
            <li
              className="p-2 hover:bg-gray-200 cursor-pointer text-black"
              onClick={() => logout({
                logoutParams: {
                  returnTo: window.location.origin
                }
              })}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;