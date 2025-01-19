/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { Post, ReactionKey, Comment, User } from "../types";
import CommentForm from "./CommentForm";
import ReactionBar from "./ReactionBar";
import UserProfileModal from "./UserProfileModal";
import { GET_USER } from "../queries/getUserQuery";
import { useQuery } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";

interface PostCardProps {
  post: Post;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUserName(userId: string, queryResult: any) {
  for (const community of queryResult.me.communities) {
    for (const user of community.users) {
      if (user.id === userId) {
        return user.username;
      }
    }
  }
  return userId;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [reactions, setReactions] = useState(post.reactions);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [addComment] = useMutation(gql`
    mutation CreateComment($postId: String!, $input: CreateCommentInput!) {
      createComment(postId: $postId, data: $input) {
        id
        authorId
      }
    }
  `);
  const [createReaction] = useMutation(gql`
    mutation CreateReaction($input: CreateReactionInput!) {
      createReaction(data: $input) {
        id
      }
    }
  `);

  const [updateReaction] = useMutation(gql`
    mutation UpdateReaction($input: UpdateReactionInput!) {
      updateReaction(data: $input) {
        id
      }
    }
  `);

  const [removeReaction] = useMutation(gql`
    mutation RemoveReaction($input: RemoveReactionInput!) {
      removeReaction(data: $input) {
        id
      }
    }
  `)

  const { data, loading, error } = useQuery(GET_USER);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const authorName = mapUserName(post.authorId, data) || "Unknown Author";
  const formattedDate = new Date(post.createdAt).toLocaleString();

  const handleAddComment = (content: string) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newComment: any= {
      content,
    };
    const result = addComment({
      variables: { postId: post.id, input: newComment },
    });
    result.then((r) => {
      setComments([
        ...comments,
        {
          ...newComment,
          authorId: mapUserName(r.data.createComment.authorId, data),
          id: r.data.id,
          createdAt: new Date().toISOString(),
        },
      ]);
    });
  };

  const handleReaction = (reactionType: ReactionKey) => {
    if (reactions.myReaction == reactionType) {
      const removReaction = {...reactions}
      removReaction[reactionType] -= 1
      removReaction.myReaction = null
      setReactions(removReaction)
      removeReaction({variables: {input: {postId: post.id}}})
      return
    }
    if (reactions.myReaction) {
      const updatReactions = { ...reactions };
      updatReactions[reactions.myReaction] -= 1;
      updatReactions[reactionType] += 1;
      updatReactions.myReaction = reactionType;
      setReactions(updatReactions);
      updateReaction({
        variables: { input: { postId: post.id, reaction: reactionType } },
      });
      return;
    }

    createReaction({
      variables: { input: { postId: post.id, reaction: reactionType } },
    });
    const updatedReactions = { ...reactions };
    updatedReactions[reactionType] += 1;
    updatedReactions.myReaction = reactionType;
    setReactions(updatedReactions);
  };

  return (
    <div className="p-4 mb-4 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 cursor-pointer">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold">{authorName}</span>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
      <p className="mb-2">
        {/*@ts-ignore*/}
        {post.content[Object.keys(post.content)[0]]}
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
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 cursor-pointer">
                    {(mapUserName(comment.authorId, data) ||
                      "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold">
                      {mapUserName(comment.authorId, data) || "Unknown"}:{" "}
                    </span>
                    <span>{comment.content}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {commentDate}
                </span>
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
