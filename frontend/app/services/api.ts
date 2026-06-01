import { fetchData } from "~/lib/utils"

class API_REQUEST {
    private API_URL = import.meta.env.VITE_API_URL
    private ENDPOINT = {
        register: this.API_URL + "/auth/register",
        login: this.API_URL + "/auth/login",
        loginWithGoogle: this.API_URL + "/auth/google",
        loginWithFacebook: this.API_URL + "/auth/facebook",

        me: this.API_URL + "/users/me",
        users: this.API_URL + "/users",
    }
    async register(email: string, password: string, username: string) {
        const body = JSON.stringify({ email, password, displayName: username })
        const res = await fetch(this.ENDPOINT.register, {
            body,
            headers: { "Content-Type": "application/json" },
            method: "POST",
            credentials: "include",
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }
    async login(email: string, password: string) {
        const body = JSON.stringify({ email, password })
        const res = await fetch(this.ENDPOINT.login, {
            body,
            headers: { "Content-Type": "application/json" },
            method: "POST",
            credentials: "include",
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }
    async loginWithGoogle() {
        window.location.href = this.ENDPOINT.loginWithGoogle
    }
    async loginWithFacebook() {
        window.location.href = this.ENDPOINT.loginWithFacebook
    }

    async me() {
        return fetchData(this.ENDPOINT.me)
    }

    async users() {
        return fetchData(this.ENDPOINT.users)
    }
}

export default new API_REQUEST()
