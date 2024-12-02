import React from "react";

interface Post {
  id: string;
  content: string;
  timestamp: string;
}

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md">
      <p>{post.content}</p>
      <p className="text-gray-500 text-sm">
        {new Date(post.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default PostCard;
