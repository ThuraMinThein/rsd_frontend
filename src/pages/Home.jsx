import { Box, Alert } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useApp } from "../ThemedApp";
import { useQuery } from "@apollo/client";
import { GetPosts } from "../queries/post-query";
import { useMutation } from "react-query";

export default function Home() {
    const { showForm, setGlobalMsg } = useApp();

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = "Bearer " + import.meta.env.VITE_TOKEN;

    const { data, error, loading } = useQuery(GetPosts());

    const remove = useMutation(
        async id => {
            const res = await fetch(`${baseUrl}/posts/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Authorization": token
                }
            });
            if (res.ok) {
                window.location.reload();
                setGlobalMsg("A comment deleted");
            } else {
                setGlobalMsg("Error deleting comment");
            }

        }
    )

    const add = useMutation(
        async data => {
            if (!data.content) {
                setGlobalMsg("Content is required");
                return;
            }
            const res = await fetch(`${baseUrl}/posts`, {
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
                setGlobalMsg("A post added");
            } else {
                setGlobalMsg("Error adding post");
            }
        }
    )

    if (error) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        );
    }
    if (loading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
    }

    return (
        <Box>
            {showForm && <Form add={add.mutate} />}
            {data.posts.map(item => {
                return (
                    <Item key={item.id} item={item} remove={remove.mutate} />
                );
            })}
        </Box>
    );
}