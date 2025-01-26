import { createContext, useContext, useMemo, useState } from "react";
import App from "./App.jsx";
import {
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";


const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export default function ThemedApp() {
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState('dark');


    const theme = useMemo(() => {
        return createTheme({
            palette: { mode },
            primary: deepPurple,
            banner: mode === "dark" ? grey[800] : grey[200],
            text: {
                fade: grey[500],
            },
        })
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ showForm, setShowForm, mode, setMode }}>
                <App />
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    )
}