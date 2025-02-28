import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "../libs/fetcher";
import { login } from "../auth/auth-service";

export default function Login() {
    const navigate = useNavigate();
    const { setAuth } = useApp();
    const { setGlobalMsg } = useApp();

    const [error, setError] = useState(null);

    const userNameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = () => {
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        if (!userName || !password) {
            setError("All fields are required");
            return;
        }
        loginAccount.mutate({ userName, password });
    }

    const loginAccount = useMutation(async ({ userName, password }) => loginUser(userName, password), {
        onError: async (user) => {
            setError(user.message);
        },
        onSuccess: async (user) => {
            setAuth(user);
            login(user.accessToken)
            setGlobalMsg("Login successful");
            navigate("/");
        }
    })

    return (
        <Box>
            <Typography variant="h3">Login</Typography>
            {error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2, }}>
                    <TextField
                        inputRef={userNameRef}
                        placeholder="Username"
                        fullWidth
                    />
                    <TextField
                        inputRef={passwordRef}
                        type="password"
                        placeholder="Password"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                </Box>
            </form>
        </Box>
    );
}