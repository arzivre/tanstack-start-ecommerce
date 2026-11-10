import { Brand } from "#/components/templates/brand";
import { Footer } from "#/components/templates/store/footer";
import Collections from "#/components/templates/store/homepage/collections";
import { CtaBanner } from "#/components/templates/store/homepage/cta-banner";
import { FeatureGrid } from "#/components/templates/store/homepage/feature-grid";
import { Hero } from "#/components/templates/store/homepage/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(store)/_layout/")({ component: App });

function App() {
    return (
        <div className="min-h-screen">
            <Hero />
            <FeatureGrid />
            <Collections />
            <CtaBanner />
            <Brand />
            <Footer />
        </div>
    );
}
