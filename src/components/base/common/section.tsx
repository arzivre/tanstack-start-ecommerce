import { cn } from '#/lib/utils'

interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
  sectionClassName?: string
  headingClassName?: string
  descriptionClassName?: string
  rightAsset?: React.ReactNode
  rightAssetClassName?: string
  containerClassName?: string
  rightAction?: React.ReactNode
  rightActionClassName?: string
}

export default function Section({
  title,
  description,
  children,
  sectionClassName,
  headingClassName,
  descriptionClassName,
  rightAsset,
  rightAssetClassName,
  containerClassName,
  rightAction,
  rightActionClassName,
}: SectionProps) {
  return (
    <section
      className={cn(
        '@container container mx-auto my-20 px-4 [content-visibility:auto]',
        sectionClassName,
      )}
    >
      <div
        className={cn(
          'relative z-10 overflow-hidden rounded-2xl border-2 border-dashed',
          containerClassName,
        )}
      >
        {rightAsset && (
          <div
            className={cn(
              'pointer-events-none absolute top-0 right-0 -z-10',
              rightAssetClassName,
            )}
          >
            {rightAsset}
          </div>
        )}
        <div
          className={cn(
            'mb-0 p-5 @4xl:p-12 @6xl:p-15 @7xl:p-20',
            rightAction
              ? 'space-y-7 @4xl:flex @4xl:items-center @4xl:justify-between @4xl:gap-6'
              : 'space-y-7',
          )}
        >
          <div className="max-w-201 space-y-7">
            <h2
              className={cn(
                'text-[28px] uppercase @5xl:text-[38px] @7xl:text-5xl',
                headingClassName,
              )}
            >
              {title}
            </h2>
            {description && (
              <p className={cn(descriptionClassName)}>{description}</p>
            )}
          </div>
          {rightAction && (
            <div
              className={cn(
                'flex justify-center @4xl:justify-end',
                rightActionClassName,
              )}
            >
              {rightAction}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
