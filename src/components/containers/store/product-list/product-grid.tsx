import { ProductCard } from "@/components/base/products/product-card";
import { ProductGridSkeleton } from "@/components/base/products/product-grid-skeleton";
import { ProductNotFound } from "@/components/base/products/product-not-found";
import type { DisplayProduct } from "@/types/store-types";

interface ProductGridProps {
    products: DisplayProduct[];
    isLoading?: boolean;
    viewMode?: "grid" | "list";
}
export function ProductGrid({
    products,
    isLoading,
    //   viewMode = 'grid',
}: ProductGridProps) {
    if (isLoading) {
        return <ProductGridSkeleton />;
    }

    if (products.length === 0) {
        return <ProductNotFound />;
    }

    return (
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
