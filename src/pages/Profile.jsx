import { Avatar, Box, Typography, Alert } from "@mui/material";
import { pink } from "@mui/material/colors";
import Item from "../components/Item";
import { useQuery } from "@apollo/client";
import { GetPostsWithUserId } from "../queries/post-query";

export default function Profile() {

    const { data, error, loading } = useQuery(GetPostsWithUserId(2));

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
            <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }}></Box>
            <Box
                sx={{
                    mb: 4,
                    marginTop: "-60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
                <Box sx={{ textAlign: "center" }}>
                    <Typography>Alice</Typography>
                    <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
                        Alice's profile bio content here
                    </Typography>
                </Box>
            </Box>
            {data.postsWithUserId.map(item => {
                return <Item key={item.id} item={item} />;
            })}
        </Box>
    );
}