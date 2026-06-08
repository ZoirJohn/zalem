import { ShieldCheck, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ProtectedRoute } from "~/ProtectedRoute";
import { formatDate } from "~/lib/utils";
import { ProfileField } from "../components/ProfileField";
import { useCurrentUserStore } from "~/store/store";

export default function Profile() {
    const { user } = useCurrentUserStore();
    const currentUser = user as User;

    return (
        <ProtectedRoute redirectTo="/login" shouldUserExist="Y">
            <section className="min-h-dvh bg-claude-canvas px-4 py-6 text-claude-ink sm:px-8 sm:py-8 lg:px-12">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                    <header className="rounded-[20px] border border-claude-hairline bg-claude-surface-card p-6 sm:p-8">
                        <div className="flex items-center gap-3 text-sm font-medium text-claude-muted">
                            <span className="inline-flex size-10 items-center justify-center rounded-full bg-claude-primary/10 text-claude-primary">
                                <HugeiconsIcon
                                    icon={UserIcon}
                                    className="size-5"
                                />
                            </span>
                            <span>Profile</span>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <h1 className="text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
                                {currentUser.display_name || "Anonymous User"}
                            </h1>
                            <p className="max-w-2xl text-sm leading-relaxed text-claude-body sm:text-base">
                                Your profile details are shown below. Internal
                                account IDs are intentionally hidden.
                            </p>
                        </div>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-claude-hairline bg-claude-canvas px-3 py-1 text-sm text-claude-body">
                            <HugeiconsIcon
                                icon={ShieldCheck}
                                className="size-4 text-claude-primary"
                            />
                            {currentUser.role === "god"
                                ? "Privileged account"
                                : "Standard account"}
                        </div>
                    </header>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <ProfileField label="Display name" value={currentUser.display_name || "Anonymous User"} />
                        <ProfileField label="Email" value={currentUser.email} />
                        <ProfileField label="Blocked" value={currentUser.blocked} />
                        <ProfileField label="Email verified" value={currentUser.is_email_verified} />
                        <ProfileField label="Role" value={currentUser.role} />
                        <ProfileField label="Created at" value={formatDate(currentUser.created_at)} />
                        <ProfileField label="Updated at" value={formatDate(currentUser.updated_at)} />
                        <ProfileField
                            label="Connected accounts"
                            value={
                                [currentUser.google_id, currentUser.facebook_id].filter(Boolean).length > 0
                                    ? "Linked"
                                    : "Not linked"
                            }
                        />
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    );
}
