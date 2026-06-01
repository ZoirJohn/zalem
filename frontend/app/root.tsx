import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router"
import "./app.css"
import { TooltipProvider } from "./components/ui/tooltip"
import { Toaster } from "sonner"
import { useEffect, useState } from "react"
import API_REQUEST from "./services/api"
import type { User } from "./types"
import type { Route } from "./+types/root"

export function Layout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API_REQUEST.me()
            .then((d) => setUser(d.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    return (
        <html lang="en" role="main">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
                <title>Home</title>
            </head>
            <body>
                <TooltipProvider>
                    <div id="wrapper">{children}</div>
                    <Toaster />
                </TooltipProvider>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function HydrateFallback() {
    return (
        <main className="flex h-screen items-center justify-center">
            <div className="loader"></div>
        </main>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!"
    let details = "An unexpected error occurred."
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error"
        details = error.status === 404 ? "The requested page could not be found." : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}
