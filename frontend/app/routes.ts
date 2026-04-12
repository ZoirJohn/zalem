import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes"

export default [
  index("./pages/Home.tsx"),
  route("login", "./pages/Login.tsx"),
  route("signup", "./pages/Signup.tsx"),
  route("chat", "./pages/Chat.tsx", [
    index("./components/Chat/Main.tsx"),
    route(":userId", "./components/Chat/Inbox.tsx"),
  ]),
] satisfies RouteConfig
