import { vi } from "vitest"

export const mockLogin = vi.fn()
export const mockRegister = vi.fn()

vi.mock("../../app/server/api", () => ({
    default: {
        login: mockLogin,
        register: mockRegister,
    },
}))
