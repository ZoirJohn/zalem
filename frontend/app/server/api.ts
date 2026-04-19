class API_REQUEST {
    API_URL = import.meta.env.VITE_API_URL
    ENDPOINT = {
        register: this.API_URL + "/auth/register",
        login: this.API_URL + "/auth/login",
        loginWithGoogle: this.API_URL + "/auth/google",
        loginWithFacebook: this.API_URL + "/auth/facebook",
    }
    async register(email: string, password: string, username: string) {
        try {
            const body = JSON.stringify({ email, password, username })
            const res = await fetch(this.ENDPOINT.login, {
                body,
                headers: { "Content-Type": "application/json" },
                method: "POST",
            })
            const data = res.json()
            console.log(data)
        } catch (error) {}
    }
    async login(email: string, password: string) {
        try {
            const body = JSON.stringify({ email, password })
            const res = await fetch(this.ENDPOINT.login, { body, headers: { "Content-Type": "application/json" } })
            const data = res.json()
            console.log(data)
        } catch (error) {}
    }
}

export default new API_REQUEST()
