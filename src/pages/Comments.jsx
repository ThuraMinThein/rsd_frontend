import { Box, Button, TextField, Alert } from "@mui/material";
import Item from "../components/Item";
import { useQuery } from "@apollo/client";
import { getCommentsWithPostId } from "../queries/post-query";

export default function Comments() {

    const { data, error, loading } = useQuery(getCommentsWithPostId(1));
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
            {data.commentsWithPostId.map(item => <Item key={item.id} item={item} />)}
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