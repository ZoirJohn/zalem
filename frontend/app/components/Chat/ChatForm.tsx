import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useForm } from "@tanstack/react-form"
import type { SubmitEventHandler } from "react"

interface ChatFormProps {
    sendMessage: (message: string) => void
}

export default function ChatForm(props: ChatFormProps) {
    const form = useForm({
        defaultValues: {
            message: "",
        },
        onSubmit: ({ value }) => {
            props.sendMessage(value.message)
            form.reset()
        },
    })
    const submit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }
    return (
        <form className="relative" onSubmit={(e) => submit(e)}>
            <div className="flex flex-col gap-3">
                <form.Field
                    name="message"
                    children={(field) => {
                        return (
                            <Textarea
                                placeholder="Write a message..."
                                className="min-h-[120px] w-full resize-none rounded-[8px] border border-claude-hairline bg-claude-canvas text-sm break-all text-claude-ink placeholder:text-claude-muted focus-visible:border-claude-primary focus-visible:ring-2 focus-visible:ring-claude-primary/20"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        )
                    }}
                ></form.Field>
                <div className="flex justify-end">
                    <Button
                        className="h-10 rounded-[8px] bg-claude-primary px-6 text-sm font-medium text-white hover:bg-claude-primary-active"
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </div>
        </form>
    )
}
