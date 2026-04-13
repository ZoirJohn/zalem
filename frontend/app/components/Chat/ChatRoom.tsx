import { Textarea } from "../ui/textarea"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "../ui/button"

export default function ChatRoom() {
  return (
    <section className="flex h-[calc(100vh-65px)] flex-col items-stretch p-3 sm:p-6">
      <ScrollArea className="w-full flex-1 rounded-none border-0">
        <ScrollBar nonce="true" />
      </ScrollArea>
      <form className="relative">
        <Textarea
          placeholder="Write a message..."
          className="w-full resize-none pr-21 break-all"
        />
        <Button className="absolute right-4 bottom-3.25">Send</Button>
      </form>
    </section>
  )
}
