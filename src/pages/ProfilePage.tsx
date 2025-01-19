import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../queries/meQuery";
import Navbar from "../components/Navbar";
import CommunitySidebar from "../components/CommunitySidebar";
import { Community, MeData, User } from "../types";

const ProfilePage: React.FC = () => {
  const { data, loading, error } = useQuery<MeData>(GET_ME);
  // const [newCar, setNewCar] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const currentUser: User = data?.me || {
    id: "",
    username: "",
    avatarUrl: "",
    cars: []
  };
  const communities: Community[] = data?.me?.communities ?? [];

  // const handleAddCar = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!newCar.trim()) return;

  //   const updatedCars = currentUser.cars
  //     ? [...currentUser.cars, { id: Date.now().toString(), name: newCar.trim() }]
  //     : [{ id: Date.now().toString(), name: newCar.trim() }];
  //   currentUser.cars = updatedCars;
  //   setNewCar("");
  // };

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar communities={communities} />
      </div>

      <div className="flex flex-1 pt-16">
        <div className="hidden sm:block w-64 bg-gray-200 sticky top-16 h-screen">
          <CommunitySidebar communities={communities} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="bg-white shadow p-4 rounded mb-4 flex items-center space-x-4">
            <img
              src={currentUser.avatarUrl || "/default-avatar.png"}
              alt={currentUser.username}
              className="w-16 h-16 rounded-full"
            />
            <h1 className="text-2xl font-bold">{currentUser.username}'s Profile</h1>
          </div>

          <div className="bg-white shadow p-4 rounded mb-4">
            <h2 className="text-xl font-semibold mb-2">My Cars</h2>
            {currentUser.cars && currentUser.cars.length > 0 ? (
              <ul className="list-disc ml-6">
                {currentUser.cars.map((car) => (
                  <li key={car.id} className="mb-2">
                    <strong>{car.brand} {car.model}</strong> - {car.name}
                    <div className="text-sm text-gray-600">
                      <p>Description: {car.description}</p>
                      <p>Horsepower: {car.hp}</p>
                      <p>Mileage: {car.milage} miles</p>
                      <p>VIN: {car.vin}</p>
                      <p>Plate: {car.plate}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cars in collection.</p>
            )}

            <form className="mt-4">
              <label className="block mb-1 font-medium" htmlFor="car-input">
                Add a new Car
              </label>
              <input
                id="car-input"
                type="text"
                // value={newCar}
                // onChange={(e) => setNewCar(e.target.value)}
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
