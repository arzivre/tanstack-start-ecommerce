import { WishlistTemplate } from "#/components/templates/store/accounts/wishlist-template";
import { createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "#/lib/middleware/auth";

export const Route = createFileRoute("/(store)/_layout/wishlist")({
    server: {
        middleware: [authMiddleware],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <WishlistTemplate />;
}
