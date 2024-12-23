import React, { useState } from "react";

const AvatarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src="/profile-user.png"
        alt="User Avatar"
        className="sm:w-16 sm:h-16 w-12 h-12 rounded-full cursor-pointer transition transform duration-150 hover:scale-100 active:scale-90"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <ul>
            <li className="p-2 hover:bg-gray-200 cursor-pointer text-black">
              Settingsya
            </li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer text-black">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
