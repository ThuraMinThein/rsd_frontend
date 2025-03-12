/* eslint-disable react/prop-types */
import { IconButton, ButtonGroup, Button } from "@mui/material";
import { Favorite as LikedIcon, FavoriteBorder as LikeIcon } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { useMutation } from "react-query";
import { likeUnlikeComment, likeUnlikePost } from "../libs/fetcher";

export function LikeButton({ item, comment, postLikes, commentLikes }) {
    // const navigate = useNavigate();
    const { auth } = useApp();

    function isLiked() {
        if (!auth) return false;
        if (!comment) {
            if (!postLikes) return false;
            return postLikes.find(like => like.user.id == auth.id);
        } else {
            if (!commentLikes) return false;
            return commentLikes.find(like => like.user.id == auth.id);
        }
    }
    const likePost = useMutation(id => likeUnlikePost(id), {
        onSuccess: () => {
            window.location.reload();
        },
    });
    const likeComment = useMutation(id => likeUnlikeComment(id), {
        onSuccess: () => {
            window.location.reload();
        },
    });
    return (
        <ButtonGroup>

            <IconButton
                size="small"
                onClick={e => {
                    console.log("clicked")
                    comment
                        ? likeComment.mutate(item.id)
                        : likePost.mutate(item.id);
                    e.stopPropagation();
                }}>
                {isLiked() ? (
                    <LikedIcon
                        fontSize="small"
                        color="error"
                    />
                ) : (
                    <LikeIcon
                        fontSize="small"
                        color="error"
                    />
                )}
            </IconButton>
            <Button
                onClick={e => {
                    if (!comment) {
                        // navigate(`/likes/${item.id}/comment`);
                    } else {
                        // navigate(`/likes/${item.id}/post`);
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