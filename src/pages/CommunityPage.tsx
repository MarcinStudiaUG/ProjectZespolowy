import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { communities, users } from "../data/mockData";
import PostCard from "../components/PostCard";
import CommunitySidebar from "../components/CommunitySidebar";
import Navbar from "../components/Navbar";
import CommunityUsersModal from "../components/CommunityUsersModal";
import CreatePostForm from "../components/CreatePostForm";
import { Post } from "../types/index";

interface RouteParams extends Record<string, string | undefined> {
  communityId: string;
}

const CommunityPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { communityId } = useParams<RouteParams>();
  const community = communities.find((c) => c.id === communityId);

  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Post[]>(
    community?.posts || []
  );

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <h2 className="text-xl font-semibold">
            Please log in or register to view this community.
          </h2>
        </div>
      </div>
    );
  }

  if (!community) {
    return <div>Community not found</div>;
  }

  const communityUsers = users.filter((user) =>
    user.communityIds.some((id) => id === community.id)
  );

  const handleCreatePost = (title: string, content: string) => {
    const newPost: Post = {
      id: new Date().toISOString(),
      authorId: "currentUserId",
      title,
      content: { text: content },
      isDeleted: false,
      createdAt: new Date().toISOString(),
      communityId: community.id,
      reactions: { LIKE: 0, HEART: 0, SAD: 0, SMILE: 0, myReaction: null },
    };
    setCommunityPosts([newPost, ...communityPosts]);
    setShowCreatePostForm(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <CommunitySidebar currentCommunityId={community.id} />
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-gray-800 text-white flex flex-row items-center">
            {/* Community Info */}
            <div className="w-[30%] flex flex-col items-center">
              {community.logoUrl ? (
                <img
                  src={community.logoUrl}
                  alt={community.name}
                  className="h-16 w-auto mb-2 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 mb-2 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {community.name.charAt(0)}
                </div>
              )}
              <h1
                className="text-2xl font-bold truncate"
                title={community.name}
              >
                {community.name}
              </h1>
            </div>
            <div className="w-[70%] text-left">
              <p className="text-gray-300">{community.description}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-100">
            <div className="grid grid-cols-3 items-center">
              <div className="flex justify-center">
                <button
                  onClick={() => setShowCreatePostForm(!showCreatePostForm)}
                  className="px-4 py-2 bg-[#74121D] hover:bg-[#580C1F] text-white rounded"
                >
                  Create Post
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowUsersModal(true)}
                  className="px-4 py-2 bg-[#74121D] hover:bg-[#580C1F] text-white rounded"
                >
                  See Users: {communityUsers.length}
                </button>
              </div>
            </div>
          </div>

          {showCreatePostForm && (
            <div className="w-[70%] mx-auto my-4">
              <CreatePostForm
                onSubmit={handleCreatePost}
                onCancel={() => setShowCreatePostForm(false)}
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {communityPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {showUsersModal && (
        <CommunityUsersModal
          users={communityUsers}
          onClose={() => setShowUsersModal(false)}
        />
      )}
    </div>
  );
};

export default CommunityPage;
