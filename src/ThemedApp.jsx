import { useState, createContext, useContext, useMemo } from "react";
import {
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
// import App from "./App";
import AppDrawer from "./components/AppDrawer";
import { deepPurple, grey } from "@mui/material/colors";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Template from "./Template";
import Home from "./pages/Home";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ],
    },
]);


export default function ThemedApp() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [globalMsg, setGlobalMsg] = useState(null);
    const [auth, setAuth] = useState(null);
    const [mode, setMode] = useState("dark");
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                primary: deepPurple,
                banner: mode === "dark" ? grey[800] : grey[200],
                text: {
                    fade: grey[500],
                },
            },
        });
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider
                value={{
                    showDrawer, setShowDrawer,
                    showForm, setShowForm,
                    globalMsg, setGlobalMsg,
                    auth, setAuth,
                    mode, setMode,
                }}>
                {/* <App /> */}
                <AppDrawer />
                <RouterProvider router={router} />
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    );
}