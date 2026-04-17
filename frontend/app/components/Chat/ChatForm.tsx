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
      <form.Field
        name="message"
        children={(field) => {
          return (
            <Textarea
              placeholder="Write a message..."
              className="w-full resize-none pr-21 break-all"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )
        }}
      ></form.Field>
      <Button className="absolute right-4 bottom-3.25" type="submit">
        Send
      </Button>
    </form>
  )
}
