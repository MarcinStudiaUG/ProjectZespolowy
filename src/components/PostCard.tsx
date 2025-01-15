import React, { useState } from "react";
import { Post, ReactionKey, Comment, User } from "../types";
import CommentForm from "./CommentForm";
import ReactionBar from "./ReactionBar";
import UserProfileModal from "./UserProfileModal";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [reactions, setReactions] = useState(post.reactions);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const authorName = post.authorId || "Unknown Author";
  const formattedDate = new Date(post.createdAt).toLocaleString();

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: new Date().toISOString(),
      content,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      postId: post.id,
      authorId: "currentUserId",
    };
    setComments([...comments, newComment]);
  };

  const handleReaction = (reactionType: ReactionKey) => {
    if (reactions.myReaction === reactionType) {
      setReactions({
        ...reactions,
        [reactionType]: reactions[reactionType] - 1,
        myReaction: null,
      });
    } else {
      const updatedReactions = { ...reactions };
      if (reactions.myReaction) {
        updatedReactions[reactions.myReaction] -= 1;
      }
      updatedReactions[reactionType] += 1;
      updatedReactions.myReaction = reactionType;
      setReactions(updatedReactions);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 cursor-pointer"
          >
            {authorName.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold">{authorName}</span>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
      <p className="mb-2">
        {typeof post.content === "object"
          ? JSON.stringify(post.content)
          : post.content}
      </p>

      <ReactionBar reactions={reactions} onReact={handleReaction} />

      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-500 hover:underline mt-2 mb-2 block"
      >
        {showComments
          ? "Hide Comments"
          : comments.length > 0
          ? `See Comments (${comments.length})`
          : "Add a Comment"}
      </button>

      {showComments && (
        <div className="mt-2 border-t pt-2">
          {comments.map((comment) => {
            const commentDate = new Date(comment.createdAt).toLocaleString();

            return (
              <div
                key={comment.id}
                className="flex justify-between items-start mb-2"
              >
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 cursor-pointer"
                  >
                    {(comment.authorId || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold">
                      {comment.authorId || "Unknown"}:{" "}
                    </span>
                    <span>{comment.content}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 ml-2">{commentDate}</span>
              </div>
            );
          })}
          <CommentForm onSubmit={handleAddComment} />
        </div>
      )}

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default PostCard;