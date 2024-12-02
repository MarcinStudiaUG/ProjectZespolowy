import React from "react";
import CommunitySidebar from "../components/CommunitySidebar";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const HomePage: React.FC = () => {
  const posts = [
    { id: "1", content: "Welcome to the community!", timestamp: "2025-01-01T10:00:00Z" },
    { id: "2", content: "Don't miss our upcoming event!", timestamp: "2025-01-01T09:00:00Z" },
  ];

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <CommunitySidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
