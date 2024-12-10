export interface PostContent {
    [key: string]: string | number;
  }
  
  export interface Post {
    id: string;
    authorId: string;
    title: string;
    content: PostContent;
    isDeleted: boolean;
    createdAt: string;
    communityId: string;
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
    avatarUrl: string;
    communityIds: string[];
  }