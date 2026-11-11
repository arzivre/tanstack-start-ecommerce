import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, LogOut, Package, User } from "lucide-react";

const sidebarItems = [
    {
        title: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        title: "My Orders",
        href: "/orders",
        icon: Package,
    },
    {
        title: "My Reviews",
        href: "/my-reviews",
        icon: Package,
    },
    {
        title: "My Wishlists",
        href: "/wishlist",
        icon: Heart,
    },
];

export function AccountSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <aside className="hidden w-full flex-col gap-2 @2xl:flex @2xl:w-64">
            <div className="flex flex-col gap-2">
                <div className="px-4 py-2">
                    <h2 className="mb-2 text-lg font-semibold tracking-tight">
                        My Account
                    </h2>
                    <div className="space-y-1">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                        size: "lg",
                                    }),
                                    "w-full justify-start",
                                    pathname === item.href
                                        ? "border-transparent bg-accent text-accent-foreground"
                                        : "border-transparent text-muted-foreground",
                                )}
                            >
                                <item.icon className="size-4" />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="px-4 py-2">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start"
                        // onClick={() => signOut()}
                    >
                        <LogOut className="size-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    );
}
