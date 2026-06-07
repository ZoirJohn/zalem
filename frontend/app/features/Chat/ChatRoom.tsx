import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { useEffect, useId, useRef, useState } from "react";
import ChatForm from "./ChatForm";
import { useOutletContext, useParams } from "react-router";

export default function ChatRoom() {
    const {
        userId,
        messages,
        setMessages,
        currentConversationId,
        loading,
    }: {
        userId: string;
        messages: Record<string, Message[]>;
        setMessages: (message: Message, conversation_id: string) => void;
        currentConversationId: string;
        loading: boolean;
    } = useOutletContext();

    const retryDelay = useRef(5000);
    const socket = useRef<WebSocket | null>(null);
    const scrollable = useRef<HTMLDivElement>(null);
    const isIntentionalClose = useRef(false);
    useEffect(() => {
        scrollable.current?.scrollIntoView({
            behavior: "instant",
        });
    }, [loading]);
    useEffect(() => {
        const connect = () => {
            const ws = new WebSocket(import.meta.env.VITE_WS_URL);
            ws.addEventListener("open", () => {
                retryDelay.current = 5000;
            });
            ws.addEventListener("message", (e) => {
                const data = JSON.parse(e.data);
                setMessages(data, currentConversationId);

                requestAnimationFrame(() => {
                    scrollable.current?.scrollIntoView({
                        behavior: "instant",
                    });
                });
            });
            ws.addEventListener("close", () => {
                if (isIntentionalClose.current) return;
                setTimeout(() => {
                    connect();
                }, retryDelay.current);
            });
            ws.addEventListener("error", () => {
                retryDelay.current = Math.min(retryDelay.current * 2, 30000);
            });
            socket.current = ws;
        };
        connect();
        function visibilityChange() {
            if (document.visibilityState === "hidden") {
                isIntentionalClose.current = true;
                socket.current?.close();
            } else {
                isIntentionalClose.current = false;
                connect();
            }
        }
        document.addEventListener("visibilitychange", visibilityChange);

        return () => {
            isIntentionalClose.current = true;
            socket.current?.close();
            document.removeEventListener("visibilitychange", visibilityChange);
        };
    }, [userId]);

    const sendMessage = (message: string) => {
        if (socket.current?.readyState !== WebSocket.OPEN) return;
        socket.current?.send(
            JSON.stringify({
                id: crypto.randomUUID(),
                message,
                event: "message",
                receiverId: userId,
            }),
        );
    };

    if (loading) {
        return (
            <section className="flex h-[calc(100dvh-65px)] flex-col gap-4 bg-claude-canvas px-4 py-5 sm:px-6">
                Loading...
            </section>
        );
    }

    return (
        <section className="flex h-[calc(100dvh-65px)] flex-col gap-4 bg-claude-canvas px-4 py-5 sm:px-6">
            <ScrollArea className="relative flex h-[calc(100%-180px)] w-full flex-col rounded-[16px] bg-claude-canvas">
                <ScrollBar orientation="vertical" />
                <div className="flex flex-col gap-3 px-5 py-4">
                    {messages[currentConversationId]?.length === 0 ? (
                        <div className="absolute top-1/2 left-1/2 w-50 -translate-1/2 rounded-[12px] border border-claude-hairline bg-claude-surface-card text-center text-sm text-claude-body">
                            No messages yet
                        </div>
                    ) : (
                        messages[currentConversationId]?.map((message) => (
                            <div
                                key={message.id}
                                className={
                                    "rounded-[12px] border border-claude-hairline bg-claude-surface-card px-4 py-3 text-sm whitespace-pre-wrap text-claude-ink " +
                                    (message.sender_id !== userId
                                        ? "self-end"
                                        : "self-start")
                                }
                            >
                                {message.content}
                            </div>
                        ))
                    )}
                    <div ref={scrollable} />
                </div>
            </ScrollArea>
            <ChatForm sendMessage={sendMessage} />
        </section>
    );
}
