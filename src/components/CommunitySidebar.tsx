import React from "react";

const communities = [
  { id: "1", name: "Tech Community" },
  { id: "2", name: "Book Club" },
];

const CommunitySidebar: React.FC = () => {
  return (
    <div className="hidden sm:block w-64 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Communities</h2>
      <ul>
        {communities.map((community) => (
          <li key={community.id} className="mb-2">
            <a
              href={`/community/${community.id}`}
              className="text-blue-500 hover:underline"
            >
              {community.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitySidebar;
