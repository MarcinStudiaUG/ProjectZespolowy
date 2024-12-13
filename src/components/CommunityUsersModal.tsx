import React from "react";
import { User } from "../types/index";

interface CommunityUsersModalProps {
  users: User[];
  onClose: () => void;
}

const CommunityUsersModal: React.FC<CommunityUsersModalProps> = ({
  users,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
        <button
          onClick={onClose}
          className="w-full text-right text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex items-center mb-3">
              <img
                src={user.avatarUrl || "/default-avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunityUsersModal;