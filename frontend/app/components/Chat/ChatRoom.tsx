import { useEffect, useRef } from "react"

export default function ChatRoom() {
  const socket = useRef(new WebSocket("ws://localhost:3000"))
  function click() {
    socket.current.send(
      JSON.stringify({
        id: Date.now(),
        message: "Hello World",
      })
    )
  }
  return (
    <section>
      <button onClick={() => click()}>Hello World</button>
    </section>
  )
}
