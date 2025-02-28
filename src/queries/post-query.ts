import { gql } from "@apollo/client";

export const getCurrentUser = () => {
    return gql`
        query CurrentUser {
            currentUser {
                id
                name
                userName
                bio
            }
        }
    `;
}

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
            userWithId(id: ${userId}) {
                id
                name
                userName
                bio
            }
        }
    `;
}

export const getCommentsWithPostId = (postId) => {
    return gql`
        query CommentsWithPostId {
            commentsWithPostId(postId: ${postId}) {
                id
                content
                createdAt
                user {
                    id
                    name
                    userName
                    bio
                }
                post {
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
    }
`}