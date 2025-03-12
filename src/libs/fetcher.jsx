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

export async function likeUnlikePost(data) {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/posts/like/${data.postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export async function getCurrentUser() {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/graphql`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
        body: JSON.stringify({
            query: `
            query CurrentUser {
                currentUser {
                    id
                    name
                    userName
                    bio
                }
            }
                `,
        }),
    })
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}

export async function likeUnlikeComment(data) {
    const token = "Bearer " + getToken();
    const res = await fetch(`${base_url}/comments/like/${data.commentId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "authorization": token
        },
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(res.statusText);
    }
}