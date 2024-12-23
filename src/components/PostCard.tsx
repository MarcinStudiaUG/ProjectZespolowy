import React, { useState } from "react";
import { Post, ReactionKey } from "../types/index";
import { users } from "../data/mockData";
import CommentForm from "./CommentForm";
import ReactionBar from "./ReactionBar";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [reactions, setReactions] = useState(post.reactions);

  const author = users.find((user) => user.id === post.authorId);
  const formattedDate = new Date(post.createdAt).toLocaleString();

  const handleAddComment = (content: string) => {
    const newComment = {
      id: new Date().toISOString(),
      authorId: "currentUserId",
      postId: post.id,
      content,
      isDeleted: false,
      createdAt: new Date().toISOString(),
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
        updatedReactions[reactions.myReaction] = updatedReactions[reactions.myReaction] - 1;
      }
      updatedReactions[reactionType] = updatedReactions[reactionType] + 1;
      updatedReactions.myReaction = reactionType;
      setReactions(updatedReactions);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {author && author.avatarUrl ? (
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
              {author ? author.name.charAt(0) : "?"}
            </div>
          )}
          <span className="font-bold">
            {author ? author.name : "Unknown"}
          </span>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
      <p className="mb-2">
        {typeof post.content === "object" && post.content !== null
        ? (post.content as { info?: string }).info || "No content"
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
            const commentAuthor = users.find(
              (user) => user.id === comment.authorId
            );
            return (
              <div
                key={comment.id}
                className="flex justify-between items-start mb-2"
              >
                <div className="flex items-center">
                  {commentAuthor && commentAuthor.avatarUrl ? (
                    <img
                      src={commentAuthor.avatarUrl}
                      alt={commentAuthor.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      {commentAuthor ? commentAuthor.name.charAt(0) : "?"}
                    </div>
                  )}
                  <div>
                    <span className="font-bold">
                      {commentAuthor ? commentAuthor.name : "Unknown"}:{" "}
                    </span>
                    <span>{comment.content}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            );
          })}
          <CommentForm onSubmit={handleAddComment} />
        </div>
      )}
    </div>
  );
};

export default PostCard;