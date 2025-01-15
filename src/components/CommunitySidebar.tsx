import React from "react";
import { Community } from "../types";

interface CommunitySidebarProps {
  communities: Community[];
  currentCommunityId?: string;
}

const CommunitySidebar: React.FC<CommunitySidebarProps> = ({
  communities,
  currentCommunityId,
}) => {
  const filteredCommunities = currentCommunityId
    ? communities.filter((c) => c.id !== currentCommunityId)
    : communities;

  return (
    <div className="hidden sm:block w-64 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Communities</h2>
      <div className="flex flex-col divide-y-[5px] divide-[#580C1F]">
        {filteredCommunities.map((community) => (
          <button
            key={community.id}
            onClick={() => {
              window.location.href = `/community/${community.id}`;
            }}
            className="w-full text-left hover:bg-gray-300 p-4 transition-colors duration-150 focus:outline-none"
          >
            {community.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunitySidebar;