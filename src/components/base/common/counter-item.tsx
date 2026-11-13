import { cn } from "#/lib/utils";

interface CounterItemProps {
    label: string;
    value: string;
    extraTop?: boolean;
}

export function CounterItem({ label, value, extraTop }: CounterItemProps) {
    return (
        <div
            className={cn(
                "border-2 border-r-0 border-b-0 border-dashed p-7.5 @4xl:px-12 @4xl:pb-8 @6xl:pb-13.5 @7xl:px-17.5",
                extraTop
                    ? "@4xl:border-t-0 @4xl:pt-14.5 @6xl:pt-22"
                    : "@4xl:pt-16 @6xl:pt-12.5",
            )}
        >
            <div className="text-3xl font-extrabold text-foreground @4xl:text-4xl @6xl:text-[50px]">
                {value}
            </div>
            <div className="text-sm text-muted-foreground @6xl:text-lg">
                {label}
            </div>
        </div>
    );
}
