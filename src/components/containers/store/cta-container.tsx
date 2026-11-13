import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

interface CtaContainerProps {
  className?: string
  inline?: boolean
}

export function CtaContainer({ className, inline }: CtaContainerProps) {
  if (inline) {
    return (
      <div className={cn('flex w-full items-center', className)}>
        <Link to="/" className="w-full @4xl:w-auto">
          <Button
            variant="secondary"
            size="lg"
            type="button"
            className="w-full gap-1.5 @4xl:w-auto"
          >
            Shop Now
            <ArrowUpRight className="size-5" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div
      className={cn('px-5 pb-8 @4xl:px-12 @6xl:px-15 @7xl:px-20', className)}
    >
      <div className="flex w-full items-center justify-end">
        <Link to="/">
          <Button
            variant="secondary"
            size="lg"
            type="button"
            className="gap-1.5"
          >
            Shop Now
            <ArrowUpRight className="size-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
