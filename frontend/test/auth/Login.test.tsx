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

    it("should render validation error fields, with invalid credentials", async () => {
        renderLogin()

        await userEvent.click(screen.getByTestId("login-button"))

        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    })

    it("should submit form, with valid credentials", async () => {
        renderLogin()

        await userEvent.type(screen.getByTestId("email-field"), "test@email.com")
        await userEvent.type(screen.getByTestId("password-field"), "Test123#")

        await userEvent.click(screen.getByTestId("login-button"))

        expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument()
    })
})
