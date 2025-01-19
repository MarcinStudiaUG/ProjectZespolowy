import React, { useState } from "react";
import { User } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfileModal from "./UserProfileModal";

interface CommunityUsersModalProps {
  users: User[];
  onClose: () => void;
}

const CommunityUsersModal: React.FC<CommunityUsersModalProps> = ({ users, onClose }) => {
  const { user: auth0User } = useAuth0(); // Get the logged‑in user from Auth0
  // For this example, clicking on any user will open the logged‑in user’s profile modal
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white p-4 rounded-lg w-11/12 max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl font-bold focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">Community Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center mb-4 cursor-pointer"
                // In this example, any click opens the logged‑in user’s profile modal.
                // You could customize this logic if you want to handle other users differently.
                onClick={() => setShowProfileModal(true)}
              >
                {/* Avatar Logic: Auth0 Picture or Default */}
                <img
                  src={auth0User?.picture || "/default-avatar.png"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                {/* User Information */}
                <div>
                  <span className="block font-bold">{user.username}</span>
                  <span className="block text-sm text-gray-500">
                    {user.cars?.length ? `Car: ${user.cars[0].name}` : "No cars listed"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
};

export default CommunityUsersModal;