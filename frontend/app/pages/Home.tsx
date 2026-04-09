import { NavLink } from "react-router"

export function meta() {
  return [{ title: "Home" }, { name: "description", content: "Homepage" }, {}]
}

export default function Home() {
  return (
    <section className="grid min-h-screen grid-cols-3 grid-rows-[80px_auto] gap-2 bg-[#72757e] p-2 md:grid-rows-[100px_auto] md:gap-3 md:p-3 lg:gap-6 lg:p-6">
      <header className="component-style col-span-3 flex flex-col items-center justify-center px-6 max-md:py-2 md:flex-row md:justify-between">
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

      <main className="col-span-2 grid grid-cols-5 gap-2 md:gap-3 lg:gap-6">
        <div className="component-style col-span-3 flex flex-col items-start justify-center p-6">
          <h1 className="text-4xl font-bold">Software Engineer</h1>
          <h1 className="text-center text-xl">Full Stack</h1>
        </div>
        <div className="component-style col-span-2"></div>
        <div className="component-style col-span-2"></div>
        <div className="component-style col-span-3"></div>
      </main>
      <aside className="col-span-1 grid grid-cols-1 grid-rows-[1fr_100px] gap-2 md:gap-3 lg:gap-6">
        <div className="component-style row-start-1 row-end-2"></div>
        <div className="component-style row-start-2 row-end-3"></div>
      </aside>
    </section>
  )
}
