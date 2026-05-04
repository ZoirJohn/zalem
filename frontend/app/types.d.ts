export interface User {
    blocked: boolean
    created_at: string
    display_name: string|null
    email: string
    facebook_id: string | null
    google_id: string | null
    id: string
    is_email_verified: boolean
    role: "user" | "god"
    updated_at: string
}
