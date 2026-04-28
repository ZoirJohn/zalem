import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { mockLogin } from "test/mocks/api.mock"
import { LoginForm } from "~/components/LoginForm"

describe("Login", () => {
    beforeEach(() => {
        mockLogin.mockReset()
    })

    it("should render email and password fields", () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        )
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
})
