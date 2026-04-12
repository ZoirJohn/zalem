import { Badge } from "../ui/badge"

export default function Main() {
  return (
    <section className="flex min-h-[calc(100vh-65px)] items-center justify-center">
      <Badge variant="outline">Select a chat to start messaging</Badge>
    </section>
  )
}
