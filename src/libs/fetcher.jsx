import { getToken } from "../auth/auth-service";

const base_url = import.meta.env.VITE_BASE_URL;

export async function createUser(data) {
    const res = await fetch(`${base_url}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export async function loginUser(userName, password) {

    const res = await fetch(`${base_url}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error("Incorrect Credentials");
    }

}

export async function likePost(data) {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/posts/like`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export async function unlikePost(data) {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/posts/unlike`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export async function likeComment(data) {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/comments/like`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export async function unlikeComment(data) {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/comments/unlike`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}