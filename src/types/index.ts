export type ReactionKey = "LIKE" | "HEART" | "SAD" | "SMILE";

export interface ReactionData {
  LIKE: number;
  HEART: number;
  SAD: number;
  SMILE: number;
  myReaction: ReactionKey | null;
}

export interface Comment {
  id: string;
  postId?: string;      
  authorId?: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;

}

export interface Post {
  id: string;
  authorId?: string;
  communityId: string;
  title: string;
  content: Record<string, unknown> | string; 
  isDeleted: boolean;
  createdAt: string;
  comments: Comment[];
  reactions: ReactionData;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  logoUrl: string | null;
  isDeleted: boolean;
  createdAt: string;
  posts: Post[];
}

export interface User {
  id: string;
  externalId?: string;
  username?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string | null;
  isActivated?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  communities?: Community[];
}

export interface MeData {
  me: User;
}