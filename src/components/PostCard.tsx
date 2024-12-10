import React from "react";
import { Post } from "../types/index";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md">
      <h3 className="font-bold">{post.title}</h3>
      <p>{typeof post.content === 'object' ? JSON.stringify(post.content) : post.content}</p>
      <p className="text-gray-500 text-sm">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default PostCard;