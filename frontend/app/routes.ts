import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("./pages/Home.tsx"), 
	route("/login", "./pages/Login.tsx"), 
	route("/signup", "./pages/Signup.tsx"), 
	route("/chat", "./pages/Chat.tsx", [
		index("./features/Chat/Main.tsx"), 
		route(":userId", "./features/Chat/ChatRoom.tsx")
	])] satisfies RouteConfig;
