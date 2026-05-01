import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { mockLogin } from "test/mocks/api.mock"
import { LoginForm } from "~/components/LoginForm"
import userEvent from "@testing-library/user-event"

function renderLogin() {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    )
}

describe("Login", () => {
    beforeEach(() => {
        mockLogin.mockReset()
    })

    it("should render email and password fields", () => {
        renderLogin()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it("should show validation errors on empty submit", async () => {
        renderLogin()

        await userEvent.click(screen.getByTestId("login-button"))

        expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    })
})
