import { useRef } from "react"
import { Box, TextField, Button } from "@mui/material";

export default function Form({ add }) {

    const contentRef = useRef();

    const data = {
        content: "",
        createdAt: new Date().toISOString(),
        userId: 3,
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                data.content = contentRef.current.value;
                add(data);
                e.currentTarget.reset();
            }}>
            <Box sx={{ mb: 4, textAlign: "right" }}>
                <TextField
                    inputRef={contentRef}
                    type="text"
                    placeholder="Content"
                    fullWidth
                    multiline
                    sx={{ mb: 1 }}
                />
                <Button
                    variant="contained"
                    type="submit">
                    Post
                </Button>
            </Box>
        </form>
    )
}