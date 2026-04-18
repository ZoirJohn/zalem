import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useEffect, useRef, useState, type SubmitEventHandler } from "react"
import ChatForm from "./ChatForm"

interface ChatRoomProps {
    senderId: string
    receiverId: string
}

interface Message {
    id: string
    message: string
    event: string
    senderId: string
    receiverId: string
}

export default function ChatRoom(props: ChatRoomProps) {
    const retryDelay = useRef(5000)
    const socket = useRef<WebSocket | null>(null)
    const isIntentionalClose = useRef(false)
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const connect = () => {
            const ws = new WebSocket(import.meta.env.VITE_WS_URL)
            ws.addEventListener("open", () => {
                retryDelay.current = 5000
            })
            ws.addEventListener("message", (e) => {
                const data = JSON.parse(e.data)
                setMessages((prev) => [...prev, data])
            })
            ws.addEventListener("close", () => {
                if (isIntentionalClose.current) return
                setTimeout(() => {
                    connect()
                }, retryDelay.current)
            })
            ws.addEventListener("error", () => {
                retryDelay.current = Math.min(retryDelay.current * 2, 30000)
            })
            socket.current = ws
        }
        connect()
        function visibilityChange() {
            if (document.visibilityState === "hidden") {
                isIntentionalClose.current = true
                socket.current?.close()
            } else {
                isIntentionalClose.current = false
                connect()
            }
        }
        document.addEventListener("visibilitychange", visibilityChange)
        return () => {
            isIntentionalClose.current = true
            socket.current?.close()
            document.removeEventListener("visibilitychange", visibilityChange)
        }
    }, [])

    const sendMessage = (message: string) => {
        if (socket.current?.readyState !== WebSocket.OPEN) return
        socket.current?.send(
            JSON.stringify({
                id: crypto.randomUUID(),
                message,
                event: "message",
                sender: props.senderId,
                receiver: props.receiverId,
            })
        )
    }

    return (
        <section className="flex h-[calc(100dvh-65px)] flex-col items-stretch p-3">
            <ScrollArea className="flex h-[calc(100%-65px)] w-full flex-col rounded-none border-none">
                <ScrollBar orientation="vertical" />
                {messages.map((message) => (
                    <div key={message.id}>{message.message}</div>
                ))}
            </ScrollArea>
            <ChatForm sendMessage={sendMessage} />
        </section>
    )
}
