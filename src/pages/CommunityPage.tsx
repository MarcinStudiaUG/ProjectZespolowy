import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COMMUNITIES } from "../queries/getCommunitiesQuery";
import { Community, MeData, Post } from "../types";
import PostCard from "../components/PostCard";
import CommunitySidebar from "../components/CommunitySidebar";
import Navbar from "../components/Navbar";
import CommunityUsersModal from "../components/CommunityUsersModal";
import CreatePostForm from "../components/CreatePostForm";

const CommunityPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { communityId } = useParams<{ communityId: string }>();

  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [community, setCommunity] = useState<Community>();

  const { data, loading, error } = useQuery<MeData>(GET_COMMUNITIES);
  useEffect(() => {
    if(data) {
      const communities  = data?.me?.communities || [];
      const community = communities.find((c) => c.id === communityId)
      setCommunities(communities);
      setCommunity(community)
      setCommunityPosts(community!.posts)
    }
  }, [loading])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar communities={communities} />
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

  const communityUsers = community.users || [];

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
      comments: [],
    };
    setCommunityPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowCreatePostForm(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar communities={communities} />
      <div className="flex flex-1">
        <CommunitySidebar currentCommunityId={community.id} communities={communities} />
        <div className="flex-1 flex flex-col">
          <div className="p-6 bg-gray-800 text-white flex flex-col items-center">
            {community.logoUrl ? (
              <img
                src={community.logoUrl}
                alt={community.name}
                className="h-20 w-20 mb-4 rounded-full"
              />
            ) : (
              <div className="h-20 w-20 mb-4 bg-gray-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {community.name.charAt(0)}
              </div>
            )}
            <h1 className="text-3xl font-bold mb-2" title={community.name}>
              {community.name}
            </h1>
            <p className="text-center text-gray-300">{community.description}</p>
          </div>
  
          <div className="p-4 bg-gray-100 flex justify-between">
            <button
              onClick={() => setShowCreatePostForm(!showCreatePostForm)}
              className="px-4 py-2 bg-[#74121D] hover:bg-[#580C1F] text-white rounded"
            >
              Create Post
            </button>
            <button
              onClick={() => setShowUsersModal(true)}
              className="px-4 py-2 bg-[#74121D] hover:bg-[#580C1F] text-white rounded"
            >
              See Users: {communityUsers.length}
            </button>
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
}  

export default CommunityPage;
