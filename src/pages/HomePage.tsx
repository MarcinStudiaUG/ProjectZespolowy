import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../queries/meQuery";
import { MeData, Community } from "../types";

import Navbar from "../components/Navbar";
import CommunitySidebar from "../components/CommunitySidebar";
import PostCard from "../components/PostCard";

const HomePage: React.FC = () => {
  const { data, loading, error } = useQuery<MeData>(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const communities = data!.me.communities || [];

  const allPosts = communities.flatMap((community: Community) => community.posts);

  allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <CommunitySidebar communities={communities} />

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {allPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;