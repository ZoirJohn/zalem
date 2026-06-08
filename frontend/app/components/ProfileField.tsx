import type { ReactNode } from "react";

type ProfileFieldProps = {
	label: string;
	value: string | boolean | ReactNode;
};

export function ProfileField({ label, value }: ProfileFieldProps) {
	return (
		<div className="rounded-[12px] border border-claude-hairline bg-claude-surface-card p-4">
			<p className="text-xs font-medium tracking-[0.18em] text-claude-muted uppercase">
				{label}
			</p>
			<p className="mt-2 text-sm leading-relaxed text-claude-ink">
				{typeof value === "boolean" ? (value ? "Yes" : "No") : value}
			</p>
		</div>
	);
}