import { VendorDashboardSkeleton } from "#/components/base/skeleton/vendor-dashboard-skeleton";
import { VendorDashboardTemplate } from "#/components/templates/vendor/vendor-dashboard-template";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, DollarSign, Package, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/(vendor)/_layout/dashboard")({
    component: VendorDashboardPage,
    pendingComponent: VendorDashboardSkeleton,
});

function VendorDashboardPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1% from last month",
            icon: DollarSign,
        },
        {
            title: "Total Shops",
            value: "3",
            change: "+1 new shop this month",
            icon: ShoppingBag,
        },
        {
            title: "Total Products",
            value: "234",
            change: "+19 new products",
            icon: Package,
        },
        {
            title: "Total Orders",
            value: "573",
            change: "+201 from last month",
            icon: BarChart3,
        },
    ];
    return <VendorDashboardTemplate stats={stats} />;
}
