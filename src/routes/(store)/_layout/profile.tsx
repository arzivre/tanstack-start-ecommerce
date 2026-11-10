import { ProfileTemplate } from "#/components/templates/store/accounts/profile/profile-template";
import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "@/lib/middleware/auth";

export const Route = createFileRoute("/(store)/_layout/profile")({
    server: {
        middleware: [authMiddleware],
    },
    component: ProfileTemplate,
});
