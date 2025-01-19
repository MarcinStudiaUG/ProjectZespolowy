import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../queries/meQuery";
import { User } from "../types";

interface UserProfileModalProps {
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ onClose }) => {
  const { data, loading, error } = useQuery<{ me: User }>(GET_ME);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error.message}</p>;

  const user = data?.me;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold focus:outline-none text-black"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">Profile: {user?.username}</h2>
        <div>
          <h3 className="font-semibold mb-1">Cars</h3>
          {user?.cars && user.cars.length > 0 ? (
            <ul className="list-disc ml-5">
              {user.cars.map((car) => (
                <li key={car.id} className="mb-2">
                  <p>
                    <strong>Name:</strong> {car.name}
                  </p>
                  <p>
                    <strong>Brand:</strong> {car.brand}
                  </p>
                  <p>
                    <strong>Model:</strong> {car.model}
                  </p>
                  <p>
                    <strong>Horsepower:</strong> {car.hp}
                  </p>
                  <p>
                    <strong>Milage:</strong> {car.milage}
                  </p>
                  <p>
                    <strong>VIN:</strong> {car.vin}
                  </p>
                  <p>
                    <strong>Plate:</strong> {car.plate}
                  </p>
                </li>
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