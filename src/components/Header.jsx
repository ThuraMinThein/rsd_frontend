import { useApp } from "../ThemedApp";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const { showFrom, setShowForm, mode, setMode, setShowDrawer } = useApp();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => setShowDrawer(true)}>
                    <MenuIcon />
                </IconButton>

                <Typography onClick={() => navigate("/")} sx={{ flexGrow: 1, ml: 2 }}>RSD</Typography>

                <Box>
                    <IconButton
                        color="inherit"
                        onClick={() => setShowForm(!showFrom)}>
                        <AddIcon />
                    </IconButton>
                    {mode === "dark" ? (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("light")}>
                            <LightModeIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("dark")}>
                            <DarkModeIcon />
                        </IconButton>
                    )}
                </Box>

            </Toolbar>
        </AppBar>
    )

}