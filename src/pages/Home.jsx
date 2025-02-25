import { Box, Alert } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useApp } from "../ThemedApp";
import { useQuery } from "@apollo/client";
import { GetPosts } from "../queries/post-query";

export default function Home() {
    const { showForm, setGlobalMsg } = useApp();

    const { data, error, loading } = useQuery(GetPosts());

    const remove = () => {
        setGlobalMsg("An item deleted");
    };

    const add = () => {
        setGlobalMsg("An item added");
    };

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
            {showForm && <Form add={add} />}
            {data.posts.map(item => {
                return (
                    <Item key={item.id} item={item} remove={remove} />
                );
            })}
        </Box>
    );
}