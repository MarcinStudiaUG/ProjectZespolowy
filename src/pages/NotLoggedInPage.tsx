import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const NotLoggedInPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-600">
      <h2 className="text-2xl font-semibold mb-2">Welcome to Spot Master</h2>
      <p>Please log in or register to view communities and posts.</p>
      <button
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  );
};

export default NotLoggedInPage;