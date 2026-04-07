import { NavLink } from "react-router"
import { Button } from "~/components/ui/button"

export function meta() {
  return [{ title: "Home" }, { name: "description", content: "Homepage" }, {}]
}

export default function Home() {
  return (
    <div className="flex min-h-svh p-6">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  )
}
