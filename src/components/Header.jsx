import { useApp } from "../ThemedApp";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
} from "@mui/icons-material";

export default function Header() {
    const { showFrom, setShowForm } = useApp();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start">
                    <MenuIcon />
                </IconButton>

                <Typography sx={{ flexGrow: 1, ml: 2 }}>YayCha</Typography>

                <Box>
                    <IconButton
                        color="inherit"
                        onClick={() => setShowForm(!showFrom)}>
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        edge="end">
                        <LightModeIcon />
                    </IconButton>
                </Box>

            </Toolbar>
        </AppBar>
    )

}