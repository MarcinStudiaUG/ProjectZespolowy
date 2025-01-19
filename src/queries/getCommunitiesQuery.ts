import { gql } from "@apollo/client";

export const GET_COMMUNITIES = gql`
query Me {
    me {
        communities {
            id
            name
            description
            logoUrl
            isDeleted
            createdAt
            users {
                id
                externalId
                username
                email
                bio
                avatarUrl
                isActivated
                isDeleted
                createdAt
            }
            posts {
                id
                authorId
                communityId
                title
                content
                isDeleted
                createdAt
                reactions {
                    LIKE
                    HEART
                    SAD
                    SMILE
                    myReaction
                }
                comments {
                    id
                    authorId
                    postId
                    content
                    isDeleted
                    createdAt
                }
            }
        }
    }
}
`