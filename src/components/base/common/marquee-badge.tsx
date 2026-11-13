import StarburstIcon from '#/components/ui/icons/starburst-icon'

export function MarqueeBadge({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-3 @5xl:gap-4">
      <StarburstIcon className="size-10 text-primary @5xl:size-12.5 @7xl:size-15" />
      <span className="text-xl text-body-20 uppercase @5xl:text-2xl @7xl:text-3xl">
        {label}
      </span>
    </span>
  )
}
