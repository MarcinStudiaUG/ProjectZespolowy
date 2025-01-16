import React, { useState } from "react";
import { User } from "../types/index";
import UserProfileModal from "./UserProfileModal";

interface CommunityUsersModalProps {
  users: User[];
  onClose: () => void;
}

const CommunityUsersModal: React.FC<CommunityUsersModalProps> = ({
  users,
  onClose,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white p-4 rounded-lg w-11/12 max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center mb-3 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default CommunityUsersModal;