import { Badge } from "~/components/ui/badge";

export default function Main() {
	return (
		<section className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-claude-canvas px-6 py-10">
			<div className="flex w-full max-w-xl flex-col items-center gap-4 rounded-[16px] border border-claude-hairline bg-claude-surface-card px-8 py-10 text-center">
				<Badge variant="outline" className="border-claude-hairline text-xs font-medium tracking-[0.18em] text-claude-muted uppercase">
					No active chat
				</Badge>
				<h2 className="text-2xl font-normal tracking-[-0.01em] text-claude-ink">Select a conversation to begin</h2>
				<p className="text-sm leading-relaxed text-claude-body">Pick someone from the left to see the thread. Your messages will appear here once a chat is selected.</p>
			</div>
		</section>
	);
}
