import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function meta() {
	return [{ title: "Home" }, { name: "description", content: "Homepage" }];
}
export default function Home() {
	const user = null
	const projects = [
		{
			title: "Chat",
			description: "Start conversations, explore prompts, and keep structured context as you collaborate.",
			link: "/chat",
			cta: "Open Chat",
			surface: "light",
		},
		{
			title: "Canvas Collaborator",
			description: "Co-create on a shared canvas with quick sketches, notes, and layout experiments.",
			link: "/canvas-collaborator",
			cta: "Visit Canvas",
			surface: "dark",
		},
		{
			title: "Testing Application",
			description: "Create online tests, share them with learners, and review results in one place.",
			link: "/testing",
			cta: "Run Tests",
			surface: "light",
		},
	];
	return (
		<section className="bg-claude-canvas text-claude-ink">
			<div className="mx-auto flex min-h-dvh max-w-300 flex-col gap-8 px-6 pb-8 sm:gap-16 sm:px-10 lg:px-12">
				<header className="sticky top-0 flex flex-wrap items-center justify-between gap-6 bg-claude-canvas py-8">
					<div className="flex items-center gap-3 text-sm font-medium tracking-[0.12em] text-claude-muted uppercase">
						<span className="inline-flex h-2 w-2 rounded-full bg-claude-primary" aria-hidden="true" />
						Zalem
					</div>
					<nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-claude-body">
						<Link to="/chat" className="transition-colors hover:text-claude-ink">
							Chat
						</Link>
						<Link to="/canvas-collaborator" className="transition-colors hover:text-claude-ink">
							Canvas Collaborator
						</Link>
						<Link to="/testing" className="transition-colors hover:text-claude-ink">
							Testing application
						</Link>
					</nav>
				</header>

				<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="flex flex-col gap-6">
						<h1 className="text-4xl leading-[1.05] font-normal tracking-[-0.02em] text-claude-ink sm:text-5xl lg:text-6xl">A calm home base for the projects that power your workflow.</h1>
						<p className="max-w-2xl text-base leading-relaxed text-claude-body sm:text-lg">This space gathers the subprojects that make up the ecosystem. Each one focuses on a different layer of the work—conversation, collaboration, and quality. Use the cards below to jump into the experience you need today.</p>
						<div className="flex flex-wrap gap-3">
							<Button asChild className="h-10 rounded-[8px] bg-claude-primary px-6 text-sm font-medium text-white hover:bg-claude-primary-active">
								<Link to="/chat">Start with Chat</Link>
							</Button>
							<Button asChild variant="secondary" className="h-10 rounded-[8px] border border-claude-hairline bg-claude-canvas px-6 text-sm font-medium text-claude-ink hover:bg-claude-surface-card">
								<Link to="/canvas">Explore Canvas</Link>
							</Button>
						</div>
					</div>

					<div className="rounded-[16px] border border-claude-hairline bg-claude-surface-card p-8">
						<h2 className="text-xl font-medium text-claude-ink">What lives here?</h2>
						<p className="mt-4 text-sm leading-relaxed text-claude-body">Each subproject is designed as a focused surface. Together they form a warm, editorial experience that balances soft cream canvases with deep product surfaces.</p>
						<ul className="mt-6 space-y-4 text-sm text-claude-body-strong">
							<li className="flex items-start gap-3">
								<span className="mt-1 h-2 w-2 rounded-full bg-claude-accent-teal" />
								Fast entry points into projects.
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 h-2 w-2 rounded-full bg-claude-accent-amber" />
								Distinct surfaces for each subproject.
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 h-2 w-2 rounded-full bg-claude-primary" />A shared tone: calm, warm, and confident.
							</li>
						</ul>
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => {
						const isDark = project.surface === "dark";
						return (
							<article key={project.title} className={`flex h-full flex-col justify-between rounded-[12px] border px-5 py-7 sm:px-8 sm:py-10 ${isDark ? "border-claude-surface-dark-soft bg-claude-surface-dark text-claude-canvas" : "border-claude-hairline bg-claude-surface-card text-claude-ink"}`}>
								<div>
									<p className={`text-xs font-medium tracking-[0.3em] uppercase ${isDark ? "text-claude-muted-soft" : "text-claude-muted"}`}>Subproject</p>
									<h3 className="mt-4 text-2xl leading-snug font-normal tracking-[-0.01em]">{project.title}</h3>
									<p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-claude-muted-soft" : "text-claude-body"}`}>{project.description}</p>
								</div>
								<div className="mt-8">
									<Button asChild className={`h-10 rounded-[8px] px-5 text-sm font-medium ${isDark ? "bg-claude-surface-dark-elevated text-claude-canvas hover:bg-claude-surface-dark-soft" : "bg-claude-primary text-white hover:bg-claude-primary-active"}`}>
										<Link to={project.link}>{project.cta}</Link>
									</Button>
								</div>
							</article>
						);
					})}
				</div>

				<div className="rounded-[12px] border border-claude-hairline bg-claude-canvas p-8 text-claude-ink">
					<h2 className="text-xl font-medium">Looking for your profile?</h2>
					<p className="mt-3 text-sm leading-relaxed text-claude-body">Keep your workspace, saved runs, and personal preferences in one calm place.</p>
					<div className="mt-6">
						{user ? (
							<Link to="/profile" className="text-sm font-medium text-claude-primary transition-colors hover:text-claude-primary-active">
								Go to profile
							</Link>
						) : (
							<Button asChild className="h-10 rounded-[8px] bg-claude-primary px-6 text-sm font-medium text-white hover:bg-claude-primary-active">
								<Link to="/login">Login</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
