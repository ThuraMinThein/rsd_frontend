import { Box, Button, TextField, Alert } from "@mui/material";
import Item from "../components/Item";
import { useQuery } from "@apollo/client";
import { getCommentsWithPostId } from "../queries/post-query";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useApp } from "../ThemedApp";
import { useRef } from "react";

export default function Comments() {

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = "Bearer " + import.meta.env.VITE_TOKEN;

    const navigate = useNavigate();
    const { setGlobalMsg } = useApp();
    const { id: postId } = useParams();
    const contentRef = useRef();

    const { data, error, loading } = useQuery(getCommentsWithPostId(postId));


    const removePost = useMutation(
        async id => {
            const res = await fetch(`${baseUrl}/posts/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Authorization": token
                }
            });
            if (res.ok) {
                navigate(`/`);
                setGlobalMsg("A comment deleted");
            } else {
                setGlobalMsg("Error deleting comment");
            }
        }
    )

    const removeComment = useMutation(
        async id => {
            const res = await fetch(`${baseUrl}/comments/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Authorization": token
                }
            });
            if (res.ok) {
                navigate(`/comments/${postId}`);
                window.location.reload();
                setGlobalMsg("A comment deleted");
            } else {
                setGlobalMsg("Error deleting comment");
            }
        }
    )

    const addData = {
        content: "",
        createdAt: new Date().toISOString(),
        postId,
        userId: 1
    }

    const addComment = async data => {
        if (!data.content) {
            setGlobalMsg("Content is required");
            return;
        }
        const res = await fetch(`${baseUrl}/comments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            window.location.reload();
            setGlobalMsg("A comment added");
        } else {
            setGlobalMsg("Error adding comment");
        }
    }


    if (error) {
        return (
            <Box>
                <Alert severity="warning">{error.message || error}</Alert>
            </Box>
        );
    }
    if (loading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
    }
    return (
        <Box>
            {data.commentsWithPostId.length == 0 ?
                <Box sx={{ textAlign: "center" }}>No Comments Yet</Box> :
                <>
                    <Item
                        primary
                        item={data.commentsWithPostId[0].post}
                        remove={removePost.mutate}
                        comment={true}
                    />
                    {data.commentsWithPostId.map(item =>
                        <Item
                            comment={true}
                            key={item.id}
                            item={item}
                            remove={removeComment.mutate}
                        />)}
                </>}
            <form onSubmit={e => {
                e.preventDefault();
                addData.content = contentRef.current.value;
                addComment(addData);
                e.currentTarget.reset();
            }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3, }}>
                    <TextField
                        inputRef={contentRef}
                        multiline
                        placeholder="Your Comment" />
                    <Button
                        type="submit"
                        variant="contained"
                    >Reply</Button>
                </Box>
            </form>
        </Box>
    );
}