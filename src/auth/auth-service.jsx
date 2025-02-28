import Cookies from "js-cookie";

const TOKEN_KEY = "yaycha_token";

export function login(token) {
    Cookies.set(TOKEN_KEY, token, {
        expires: 100,
        secure: true,
        sameSite: "strict",
    });
}

export function logout() {
    Cookies.remove(TOKEN_KEY);
    window.location.reload();
}

export function getToken() {
    return Cookies.get(TOKEN_KEY);
}
