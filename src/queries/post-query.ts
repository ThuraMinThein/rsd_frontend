import { gql } from "@apollo/client";

export const GetCurrentUser = () => {
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
                totalLikes
                user {
                    id
                    name
                    userName
                }
                comments {
                    id
                    content
                    createdAt
                    totalLikes
                }
            }
        }
    `;
}

export const GetPostLikes = (id: number) => {
    return gql`
        query PostLikes {
            postLikes(postId: ${id}) {
                id
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

export const GetPostsWithUserId = (userId) => {
    return gql`
        query PostsWithUserId {
            postsWithUserId(userId: ${userId}) {
                id
                content
                createdAt
                totalLikes
                user {
                    id
                    name
                    userName
                    bio
                }
                comments {
                    id
                    content
                    createdAt
                    totalLikes
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
                totalLikes
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
                    totalLikes
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

export const GetCommentLikes = (id) => {
    return gql`
        query CommentLikes {
            commentLikes(commentId: ${id}) {
                id
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