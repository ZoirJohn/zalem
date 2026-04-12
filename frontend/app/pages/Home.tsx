import { Link, NavLink } from "react-router"
import { Button } from "~/components/ui/button"
import Hex from "../assets/img/hexagon.svg"
import { HugeiconsIcon } from "@hugeicons/react"
import { CopyIcon, Tick02Icon } from "@hugeicons/core-free-icons"
import { useEffect, useState } from "react"
import Star from "../assets/img/star.svg"

export function meta() {
  return [{ title: "Home" }, { name: "description", content: "Homepage" }]
}

export default function Home() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [copied])
  const ConnectLink = ({
    conName,
    conLink,
  }: {
    conName: string
    conLink: string
  }) => {
    return (
      <li>
        <Link
          to={conLink}
          target="_blank"
          className="block text-center text-xl sm:text-3xl"
        >
          {conName}
        </Link>
      </li>
    )
  }
  function copy() {
    navigator.clipboard.writeText(import.meta.env.VITE_PERSONAL_EMAIL)
    setCopied(true)
  }
  return (
    <section className="bg-[#72757e]">
      <div className="mx-auto grid min-h-dvh max-w-4xl grid-cols-2 grid-rows-[auto_1fr_200px] gap-3 p-3">
        <header className="component-style col-span-2 flex justify-center gap-3 px-3 py-5 max-md:flex-wrap sm:justify-between sm:px-6 sm:py-10">
          <h1 className="flex gap-2 uppercase">
            <span className="italic">Zoirjon</span>
            <span className="font-bold">Zokirjonov</span>
          </h1>
          <nav>
            <ul className="flex gap-4 font-light uppercase md:gap-6 lg:gap-12">
              <li>
                <NavLink to="/chat/inbox">Chat</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/dontcheat">Don't cheat</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <div className="component-style relative col-span-2 flex flex-col items-start justify-end p-6 sm:col-span-1">
          <h1 className="text-4xl font-bold">Software Engineer</h1>
          <h1 className="text-center text-xl">Full Stack</h1>
          <img
            src={Star}
            alt="Star icon"
            className="absolute top-1/5 right-1/20 h-1/3 w-1/2"
			fetchPriority="high"
          />
        </div>
        <aside className="component-style flex flex-col items-center justify-center gap-10 p-6 max-sm:col-span-2 sm:row-span-2">
          <img src={Hex} alt="Hexagon icon" className="sm:w-20" />
          <nav>
            <ul className="flex gap-4 sm:flex-col">
              {[
                { name: "LinkedIn", link: "https://linkedin.com/in/zoirjon" },
                { name: "GitHub", link: "https://github.com/zoirjohn" },
                {
                  name: "Instagram",
                  link: "https://instagram.com/zoirjonzokirjonov22",
                },
              ].map(({ name, link }) => {
                return <ConnectLink conName={name} conLink={link} key={link} />
              })}
            </ul>
          </nav>
        </aside>

        <div className="component-style flex flex-wrap items-center justify-center gap-2 p-6 max-sm:col-span-2">
          <p className="cursor-pointer text-lg text-wrap lg:text-xl">
            <span className="max-md:hidden">
              {import.meta.env.VITE_PERSONAL_EMAIL}
            </span>
            <span className="md:hidden">Email</span>
          </p>
          <Button variant="secondary" className="size-8 text-xl" onClick={copy} aria-label="Copy">
            {copied ? (
              <HugeiconsIcon icon={Tick02Icon} />
            ) : (
              <HugeiconsIcon icon={CopyIcon} />
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
