import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CommunitySidebar from "../components/CommunitySidebar";
import { User } from "../types";
import { users } from "../data/mockData";

const ProfilePage: React.FC = () => {
  const currentUser: User = users.find((u) => u.id === "db982350-b375-479d-97fa-c960db59aa1f") || {
    id: "db982350-b375-479d-97fa-c960db59aa1f",
    name: "Alice",
    avatarUrl: "/profile-alice.png",
    communityIds: [],
    cars: ["Toyota Camry", "Honda Civic"]
  };

  const [user, setUser] = useState<User>(currentUser);
  const [newCar, setNewCar] = useState("");

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.trim()) return;

    const updatedCars = user.cars
      ? [...user.cars, newCar.trim()]
      : [newCar.trim()];

    setUser({ ...user, cars: updatedCars });
    setNewCar("");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-16">
        <div className="hidden sm:block w-64 bg-gray-200 sticky top-16 h-screen">
          <CommunitySidebar />
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="bg-white shadow p-4 rounded mb-4 flex items-center space-x-4">
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <h1 className="text-2xl font-bold">{user.name}'s Profile</h1>
          </div>

          <div className="bg-white shadow p-4 rounded mb-4">
            <h2 className="text-xl font-semibold mb-2">My Cars</h2>
            {user.cars && user.cars.length > 0 ? (
              <ul className="list-disc ml-6">
                {user.cars.map((car, idx) => (
                  <li key={idx}>{car}</li>
                ))}
              </ul>
            ) : (
              <p>No cars in collection.</p>
            )}

            <form onSubmit={handleAddCar} className="mt-4">
              <label className="block mb-1 font-medium" htmlFor="car-input">
                Add a new Car
              </label>
              <input
                id="car-input"
                type="text"
                value={newCar}
                onChange={(e) => setNewCar(e.target.value)}
                className="border p-2 mr-2 rounded w-64"
                placeholder="e.g., Ford Mustang"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;