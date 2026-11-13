import { SocialLinks } from "#/components/base/common/social-links";

export function FooterTop() {
    return (
        <div className="px-5 py-10 @4xl:px-12 @6xl:px-15 @7xl:px-20">
            <div className="flex flex-col gap-6 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                <h3 className="text-6xl font-bold @6xl:text-[124px]">
                    Shop
                    <span className="text-primary">.</span>
                    Stack
                </h3>
                <SocialLinks />
            </div>
        </div>
    );
}
