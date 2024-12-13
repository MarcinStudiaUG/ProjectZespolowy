export interface PostContent {
  [key: string]: unknown;
}

export interface Post {
  id: string;
  authorId: string;
  communityId: string;
  title: string;
  content: PostContent;
  isDeleted: boolean;
  createdAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  postId: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
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
    };
  };
}