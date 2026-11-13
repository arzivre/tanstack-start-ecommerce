import { cn } from '#/lib/utils'

interface HeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function Heading({ title, subtitle, className }: HeadingProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <h2 className="text-3xl font-extrabold tracking-tight @6xl:text-5xl">
        {title}
      </h2>
      {subtitle ? <p className="max-w-prose text-body-40">{subtitle}</p> : null}
    </div>
  )
}
