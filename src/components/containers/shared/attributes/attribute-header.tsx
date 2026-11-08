import { PageHeader } from "@/components/base/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface AttributeHeaderProps {
    onAddAttribute?: () => void;
    role?: "admin" | "vendor";
    showAddButton?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export default function AttributeHeader({
    onAddAttribute,
    role = "vendor",
    showAddButton = true,
    children,
    className,
}: AttributeHeaderProps) {
    return (
        <PageHeader
            title="Attributes"
            description={
                role === "admin"
                    ? "Manage product attributes across the platform"
                    : "Manage product attributes and variations for your shop"
            }
            className={className}
        >
            {children}
            {showAddButton && onAddAttribute && (
                <Button onClick={onAddAttribute}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Brand
                </Button>
            )}
        </PageHeader>
    );
}
