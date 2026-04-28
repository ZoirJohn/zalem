class API_REQUEST {
    API_URL = import.meta.env.VITE_API_URL
    ENDPOINT = {
        register: this.API_URL + "/auth/register",
        login: this.API_URL + "/auth/login",
        loginWithGoogle: this.API_URL + "/auth/google",
        loginWithFacebook: this.API_URL + "/auth/facebook",
    }
    async register(email: string, password: string, username: string) {
        const body = JSON.stringify({ email, password, displayName: username })
        const res = await fetch(this.ENDPOINT.register, {
            body,
            headers: { "Content-Type": "application/json" },
            method: "POST",
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
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }
}

export default new API_REQUEST()
