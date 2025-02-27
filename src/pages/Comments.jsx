import { Box, Button, TextField, Alert } from "@mui/material";
import Item from "../components/Item";
import { useQuery } from "@apollo/client";
import { getCommentsWithPostId } from "../queries/post-query";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useApp } from "../ThemedApp";

export default function Comments() {

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = "Bearer " + import.meta.env.VITE_TOKEN;

    const navigate = useNavigate();
    const { setGlobalMsg } = useApp();
    const { id: postId } = useParams();

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
    if (data.commentsWithPostId.length == 0) {
        return <Box sx={{ textAlign: "center" }}>No Comments</Box>;
    }
    return (
        <Box>
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
            <form>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3, }}>
                    <TextField multiline placeholder="Your Comment" />
                    <Button type="submit" variant="contained">Reply</Button>
                </Box>
            </form>
        </Box>
    );
}