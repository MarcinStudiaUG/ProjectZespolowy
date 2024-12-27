import React from "react";
import Navbar from "../components/Navbar";
import CommunitySidebar from "../components/CommunitySidebar";
import PostCard from "../components/PostCard";
import { communities } from "../data/mockData";

const HomePage: React.FC = () => {
  const allPosts = communities.flatMap((community) => community.posts);
  allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
