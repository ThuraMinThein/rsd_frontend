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