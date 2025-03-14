import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme, } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import { QueryClientProvider, QueryClient } from "react-query";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { getToken } from "./auth/auth-service";
import { setContext } from "@apollo/client/link/context";
import { getCurrentUser } from "./libs/fetcher";


const baseUrl = import.meta.env.VITE_BASE_URL + "/graphql";

const AppContext = createContext();

const httpLink = createHttpLink({
    uri: baseUrl,
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
export const queryClient = new QueryClient();

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
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/comments/:id",
                element: <Comments />,
            },
            {
                path: "/profile/:id",
                element: <Profile />,
            },
            {
                path: "/likes/:id",
                element: <Likes />,
            },
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

    useEffect(() => {
        getCurrentUser().then(res => {
            if (!res.data.currentUser) {
                setAuth(null);
                return;
            }
            setAuth(res.data.currentUser);
        }).catch(err => {
            console.log(err);
        });

    }, []);

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
                <QueryClientProvider client={queryClient}>
                    <ApolloProvider client={apolloClient}>
                        <RouterProvider router={router} />
                    </ApolloProvider>
                </QueryClientProvider>
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    );
}