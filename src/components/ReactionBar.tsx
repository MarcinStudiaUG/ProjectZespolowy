import React from "react";
import { ReactionKey } from "../types/index";

interface ReactionBarProps {
  reactions: {
    LIKE: number;
    HEART: number;
    SAD: number;
    SMILE: number;
    myReaction: ReactionKey | null;
  };
  onReact: (reaction: ReactionKey) => void;
}

const emojiMapping: Record<ReactionKey, string> = {
  LIKE: "👍",
  HEART: "❤️",
  SAD: "😢",
  SMILE: "😄",
};

const ReactionBar: React.FC<ReactionBarProps> = ({ reactions, onReact }) => {
  const reactionTypes: ReactionKey[] = ["LIKE", "HEART", "SAD", "SMILE"];
  return (
    <div className="flex space-x-2 mt-2">
      {reactionTypes.map((type) => (
        <button 
          key={type}
          onClick={() => onReact(type)}
          className={`flex items-center p-1 border rounded transition-colors duration-150 ${
            reactions.myReaction === type ? "bg-blue-200" : "bg-gray-100"
          }`}
        >
          <span className="mr-1">{emojiMapping[type]}</span>
          <span>{reactions[type]}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;