import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createUser } from "../libs/fetcher";
import { login } from "../auth/auth-service"

export default function Register() {

    const { setGlobalMsg } = useApp();

    const nameInput = useRef();
    const userNameInput = useRef();
    const bioInput = useRef();
    const passwordInput = useRef();

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const name = nameInput.current.value;
        const userName = userNameInput.current.value;
        const bio = bioInput.current.value;
        const password = passwordInput.current.value;

        if (!name || !userName || !bio || !password) {
            setError("All fields are required");
            return;
        }

        create.mutate({ name, userName, bio, password });

    }

    const create = useMutation(async (data) => createUser(data), {

        onError: async () => {
            setError("Something went wrong");
        },
        onSuccess: async (user) => {
            login(user.token)
            setGlobalMsg("Registration successful");
            navigate("/");
        }
    });

    return (
        <Box>
            <Typography variant="h3">Register</Typography>
            {error && (
                <Alert
                    severity="warning"
                    sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2, }}>
                    <TextField
                        inputRef={nameInput}
                        placeholder="Name"
                        fullWidth />
                    <TextField
                        inputRef={userNameInput}
                        placeholder="Username"
                        fullWidth />
                    <TextField
                        inputRef={bioInput}
                        placeholder="Bio"
                        fullWidth
                    />
                    <TextField
                        inputRef={passwordInput}
                        type="password"
                        placeholder="Password"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" fullWidth>  Register </Button>
                </Box>
            </form>
        </Box>
    );
}