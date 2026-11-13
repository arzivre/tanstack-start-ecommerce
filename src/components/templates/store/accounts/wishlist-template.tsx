import { AccountLayout } from "#/components/containers/store/accounts/account-layout";
import WishlistList from "#/components/containers/store/accounts/wishlist/wishlist-list";

export function WishlistTemplate() {
    return (
        <AccountLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Wishlists
                    </h1>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <WishlistList />
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
