import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      id
      externalId
      username
      email
      bio
      createdAt
      avatarUrl
      isActivated
      isDeleted
      communities {
        id
        name
        description
        logoUrl
        isDeleted
        createdAt
        users {
          id
          username
        }
        posts {
          id
          authorId
          communityId
          title
          content
          isDeleted
          createdAt
          comments {
            id
            authorId
            postId
            content
            isDeleted
            createdAt
          }
          reactions {
            LIKE
            HEART
            SAD
            SMILE
            myReaction
          }
        }
      }
    }
  }
`;