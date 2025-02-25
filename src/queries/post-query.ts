import { gql } from "@apollo/client";

export const GetPosts = () => {
    return gql`
    query Posts {
        posts {
            id
            content
            createdAt
            user {
                id
                name
                userName
            }
        }
    }
    `;
}

export const GetPostsWithUserId = (userId) => {
    return gql`
    query PostsWithUserId {
        postsWithUserId(userId: ${userId}) {
            id
            content
            createdAt
            user {
                id
                name
                userName
                bio
            }
        }
    }
    `;
}