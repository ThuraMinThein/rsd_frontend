import { Box, Alert } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useApp } from "../ThemedApp";
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
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

export default function Home() {
    const { showForm, setGlobalMsg } = useApp();

    const { data, error, loading } = useQuery(GET_POSTS);

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