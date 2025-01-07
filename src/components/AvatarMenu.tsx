import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";

const dummyCurrentUser: User = {
  id: "db982350-b375-479d-97fa-c960db59aa1f",
  name: "Alice",
  avatarUrl: "/profile-alice.png",
  communityIds: ["09fc7464-1c5d-48c0-8dd9-b8c34b2813c2"],
  cars: ["Toyota Camry", "Honda Civic"],
};

const AvatarMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src={dummyCurrentUser.avatarUrl || "/default-avatar.png"}
        alt={dummyCurrentUser.name}
        className="w-16 h-16 rounded-full cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <ul>
            <li>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block p-2 hover:bg-gray-200 cursor-pointer text-black"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;