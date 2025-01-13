import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import CommunitySidebar from "../components/CommunitySidebar";
import PostCard from "../components/PostCard";
import { communities } from "../data/mockData";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  const allPosts = communities.flatMap((community) => community.posts);
  allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {isAuthenticated ? (
          <>
            <CommunitySidebar />
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                {allPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-600">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                Welcome to Spot Master
              </h2>
              <p className="mt-2">
                Please <strong>Login</strong> or <strong>Register</strong> to
                view communities and posts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;