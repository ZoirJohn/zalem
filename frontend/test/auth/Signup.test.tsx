import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { mockRegister } from "test/mocks/api.mock"
import { SignupForm } from "~/components/SignupForm"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

function renderSignup() {
    render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>
    )
}

describe("Signup", () => {
    beforeEach(() => {
        mockRegister.mockReset()
    })

    it("should render full name, email, password, confirm password fields", () => {
        renderSignup()
        expect(screen.getByLabelText("Full name")).toBeInTheDocument()
        expect(screen.getByLabelText("Email")).toBeInTheDocument()
        expect(screen.getByLabelText("Password")).toBeInTheDocument()
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument()
    })

    it("should render error fields, with invalid credentials", async () => {
        renderSignup()
        await userEvent.click(screen.getByText("Create Account"))
        expect(screen.getByText("Full name is required")).toBeInTheDocument()
        expect(screen.getByText("Email is required")).toBeInTheDocument()
        expect(screen.getByText("Password is required")).toBeInTheDocument()
        expect(screen.getByText("Confirm password is required")).toBeInTheDocument()
    })

    it("should submit form, with valid credentials", async () => {
        renderSignup()
        await userEvent.type(screen.getByPlaceholderText("Full name"), "Test")

        expect(screen.queryByText("Full name is required")).not.toBeInTheDocument()
    })
})
