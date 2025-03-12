/* eslint-disable react/prop-types */
import { IconButton, ButtonGroup, Button } from "@mui/material";
import { Favorite as LikedIcon, FavoriteBorder as LikeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useApp, queryClient } from "../ThemedApp";
import { useMutation } from "react-query";
import { likeUnlikePost, likeUnlikeComment } from "../libs/fetcher";

export function LikeButton({ item, comment }) {
    console.log(item)
    const navigate = useNavigate();
    const { auth } = useApp();
    function isLiked() {
        if (!auth) return false;
        if (!item.likes) return false;
        return item.likes.find(like => like.userId == auth.id);
    }
    const likePost = useMutation(id => likeUnlikePost(id), {
        onSuccess: () => {
            queryClient.refetchQueries("posts");
            queryClient.refetchQueries("comments");
        },
    });
    const likeComment = useMutation(id => likeUnlikeComment(id), {
        onSuccess: () => {
            queryClient.refetchQueries("comments");
        },
    });
    const unlikePost = useMutation(id => likeUnlikePost(id), {
        onSuccess: () => {
            queryClient.refetchQueries("posts");
            queryClient.refetchQueries("comments");
        },
    });
    const unlikeComment = useMutation(id => likeUnlikeComment(id), {
        onSuccess: () => {
            queryClient.refetchQueries("comments");
        },
    });
    return (
        <ButtonGroup>
            {isLiked() ? (
                <IconButton
                    size="small"
                    onClick={e => {
                        comment
                            ? unlikeComment.mutate(item.id)
                            : unlikePost.mutate(item.id);
                        e.stopPropagation();
                    }}>
                    <LikedIcon
                        fontSize="small"
                        color="error"
                    />
                </IconButton>
            ) : (
                <IconButton
                    size="small"
                    onClick={e => {
                        comment
                            ? likeComment.mutate(item.id)
                            : likePost.mutate(item.id);
                        e.stopPropagation();
                    }}>
                    <LikeIcon
                        fontSize="small"
                        color="error"
                    />
                </IconButton>
            )}
            <Button
                onClick={e => {
                    if (comment) {
                        navigate(`/likes/${item.id}/comment`);
                    } else {
                        navigate(`/likes/${item.id}/post`);
                    }
                    e.stopPropagation();
                }}
                sx={{ color: "text.fade" }}
                variant="text"
                size="small">
                {item.totalLikes ? item.totalLikes : 0}
            </Button>
        </ButtonGroup>
    );
}