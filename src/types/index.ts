export type ReactionKey = "LIKE" | "HEART" | "SAD" | "SMILE";

export interface PostContent {
  [key: string]: unknown;
}

export interface ReactionData {
  LIKE: number;
  HEART: number;
  SAD: number;
  SMILE: number;
  myReaction: ReactionKey | null;
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
  content: PostContent;
  isDeleted: boolean;
  createdAt: string;
  reactions: ReactionData;
  comments?: Comment[];
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
  name: string;
  avatarUrl: string | null;
  communityIds: string[];
}

export interface GraphQLResponse {
  data: {
    me: User & {
      externalId?: string;
      username?: string;
      email?: string;
      bio?: string;
      isActivated?: boolean;
      communities: Community[];
      createdAt: string;
    }
  };
}