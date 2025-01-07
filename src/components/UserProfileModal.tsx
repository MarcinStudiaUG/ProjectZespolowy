import React from "react";
import { User } from "../types";

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold focus:outline-none text-black"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">Profile: {user.name}</h2>
        <div>
          <h3 className="font-semibold mb-1">Cars</h3>
          {user.cars && user.cars.length > 0 ? (
            <ul className="list-disc ml-5">
              {user.cars.map((car, index) => (
                <li key={index}>{car}</li>
              ))}
            </ul>
          ) : (
            <p>No car information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;