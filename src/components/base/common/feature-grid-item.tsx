import { cn } from '#/lib/utils'

interface FeatureGridItemProps {
  title: string
  description: string
  icon: React.ReactNode
  iconClassName?: string
  outlineIcon: React.ReactNode
  outlineIconClassName?: string
  className?: string
}
export function FeatureGridItem({
  title,
  description,
  icon,
  iconClassName,
  outlineIcon,
  outlineIconClassName,
  className,
}: FeatureGridItemProps) {
  return (
    <div
      className={cn(
        'relative border-dashed p-[30px] @4xl:p-10 @6xl:p-[50px] @7xl:p-[60px]',
        className,
      )}
    >
      <div
        className={cn(
          'mb-6 size-[76px] @4xl:mb-10 @6xl:mb-[50px] @6xl:size-24',
          iconClassName,
        )}
      >
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-lg @4xl:text-xl @6xl:text-2xl">{title}</h4>
        <p>{description}</p>
      </div>
      <div
        className={cn(
          'absolute top-0 right-0 size-[173px]',
          outlineIconClassName,
        )}
      >
        {outlineIcon}
      </div>
    </div>
  )
}
