import React, { useState } from "react";
import AvatarMenu from "./AvatarMenu";

const communities = [
  { id: "1", name: "Tech Community" },
  { id: "2", name: "Book Club" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative bg-brand-cardinal-500">
      <div className="flex items-center justify-between p-2 px-5 text-white">
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex items-center mr-4 p-2 transition-transform duration-150 hover:scale-100 active:scale-90 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <a
            href="/"
            className="transition-transform duration-150 hover:scale-100 active:scale-90"
          >
            <img
              src="/logo.png"
              alt="App Logo"
              className="sm:h-16 h-12 w-auto mr-2 rounded-full"
            />
          </a>
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold">Spot Master</h1>
        </div>

        <div>
          <AvatarMenu />
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div
            className="relative rounded-lg shadow-lg w-11/12 max-w-md p-6"
            style={{ backgroundColor: "#8C2B2B" }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 left-4 text-3xl font-bold focus:outline-none"
            >
              &times;
            </button>

            <h2 className="text-2xl text-center font-bold mb-6">Communities</h2>

            <ul>
              {communities.map((community) => (
                <li key={community.id} className="mb-4">
                  <a
                    href={`/community/${community.id}`}
                    className="block bg-[#7A2525] p-4 rounded-md shadow-md transition-colors duration-150 hover:bg-[#5A1A1A]"
                    onClick={() => setMenuOpen(false)}
                    >
                    {community.name}
                    </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
