import { Link, NavLink } from "react-router"
import Star from "../assets/img/star.svg"
import Hex from "../assets/img/hexagon.svg"
import { Button } from "~/components/ui/button"

export function meta() {
  return [{ title: "Home" }, { name: "description", content: "Homepage" }]
}

export default function Home() {
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
          className="block text-center text-3xl"
        >
          {conName}
        </Link>
      </li>
    )
  }
  return (
    <section className="bg-[#72757e]">
      <div className="mx-auto grid min-h-screen max-w-4xl grid-cols-2 grid-rows-[auto_1fr_200px] gap-3 p-3">
        <header className="component-style col-span-2 flex justify-between px-6 py-10">
          <h1 className="flex gap-2 uppercase">
            <span className="italic">Zoirjon</span>
            <span className="font-bold">Zokirjonov</span>
          </h1>
          <nav>
            <ul className="flex gap-4 font-light uppercase md:gap-6 lg:gap-12">
              <li>
                <NavLink to="/chat">Chat</NavLink>
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

        <div className="component-style relative col-span-1 flex flex-col items-start justify-end p-6">
          <h1 className="text-4xl font-bold">Software Engineer</h1>
          <h1 className="text-center text-xl">Full Stack</h1>
          <img
            src={Star}
            alt="Star icon"
            className="absolute top-10 right-10"
          />
        </div>

        <aside className="component-style row-span-2 flex flex-col items-center justify-center gap-10">
          <img src={Hex} alt="Hexagon icon" className="w-20" />
          <nav>
            <ul className="flex flex-col gap-4">
              {[
                { name: "LinkedIn", link: "https://linkedin.com/in/zoirjon" },
                { name: "GitHub", link: "https://github.com/zoirjohn" },
                {
                  name: "Instagram",
                  link: "https://instagram.com/zoirjonzokirjonov22",
                },
              ].map(({ name, link }) => {
                return <ConnectLink conName={name} conLink={link} />
              })}
            </ul>
          </nav>
        </aside>
        <div className="component-style flex items-center justify-center gap-2">
          <p className="cursor-pointer text-xl">
            zoirbekzokirjonov2007@gmail.com
          </p>
          <Button variant="secondary" className="size-8 text-xl"> </Button>
        </div>
      </div>
    </section>
  )
}
