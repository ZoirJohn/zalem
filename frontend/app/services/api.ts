import { fetchData } from "~/lib/utils";

class API_REQUEST {
    private API_URL = import.meta.env.VITE_API_URL;
    private ENDPOINT = {
        register: this.API_URL + "/auth/register",
        login: this.API_URL + "/auth/login",
        logout: this.API_URL + "/auth/logout",
        loginWithGoogle: this.API_URL + "/auth/google",
        loginWithFacebook: this.API_URL + "/auth/facebook",

        me: this.API_URL + "/users/me",
        users: this.API_URL + "/users",

        conversations: this.API_URL + "/conversations",
        messages: this.API_URL + "/messages",
    };
    async register(email: string, password: string, username: string) {
        const body = JSON.stringify({
            email,
            password,
            display_name: username,
        });
        const res = await fetch(this.ENDPOINT.register, {
            body,
            headers: { "Content-Type": "application/json" },
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    }
    async login(email: string, password: string) {
        const body = JSON.stringify({ email, password });
        const res = await fetch(this.ENDPOINT.login, {
            body,
            headers: { "Content-Type": "application/json" },
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    }
    async loginWithGoogle() {
        window.location.href = this.ENDPOINT.loginWithGoogle;
    }
    async loginWithFacebook() {
        window.location.href = this.ENDPOINT.loginWithFacebook;
    }

    async me() {
        return fetchData(this.ENDPOINT.me);
    }

    async users() {
        return fetchData(this.ENDPOINT.users);
    }
    async conversations(receiverId: string) {
        return fetchData(this.ENDPOINT.conversations + "/" + receiverId);
    }
    async messages(conversation_id: string) {
        return fetchData(this.ENDPOINT.messages + "/" + conversation_id);
    }
    async logout() {
        await fetch(this.ENDPOINT.logout, {
            method: "POST",
            credentials: "include",
        });
    }
}

const api = new API_REQUEST();
export { api };
