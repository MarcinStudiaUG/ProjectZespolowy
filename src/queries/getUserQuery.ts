import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Me {
    me {
        communities {
            users {
                username
                id
            }
        }
    }
}
`;