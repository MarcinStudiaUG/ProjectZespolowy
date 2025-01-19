export type ReactionKey = "LIKE" | "HEART" | "SAD" | "SMILE";

export interface ReactionData {
  LIKE: number;
  HEART: number;
  SAD: number;
  SMILE: number;
  myReaction: ReactionKey | null;
}

export interface Car {
  id: string;
  ownerId?: string; // Optional
  name: string;
  description: string;
  brand: string;
  model: string;
  hp: number;
  milage: number;
  vin?: string;
  plate: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  postId: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  communityId: string;
  title: string;
  content: Record<string, unknown> | string;
  isDeleted: boolean;
  createdAt: string;
  comments: Comment[];
  reactions: ReactionData;
}

export interface User {
  id: string;
  username: string;
  avatarUrl?: string | null;
  cars?: Car[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  logoUrl: string | null;
  isDeleted: boolean;
  createdAt: string;
  posts: Post[];
  users: User[];
}

export interface MeData {
  me: {
    id: string;
    externalId: string;
    username: string;
    email: string;
    bio: string;
    createdAt: string;
    avatarUrl?: string | null;
    isActivated: boolean;
    isDeleted: boolean;
    communities: Community[];
  };
}