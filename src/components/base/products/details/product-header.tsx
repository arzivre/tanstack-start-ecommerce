import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'

interface ProductHeaderProps {
  title: string
  category: {
    name: string
    slug: string
  }
  rating: number
  reviewCount: number
  isOnSale: boolean
  className?: string
}

export function ProductHeader({
  title,
  category,
  rating,
  reviewCount,
  isOnSale,
  className,
}: ProductHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {isOnSale && (
        <Badge variant="destructive" className="w-fit">
          Sale
        </Badge>
      )}

      <h1 className="text-3xl font-bold tracking-tight text-foreground @2xl:text-4xl">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Link
            to={`/category/$slug`}
            params={{ slug: category.slug }}
            className="font-medium text-primary hover:underline"
          >
            {category.name}
          </Link>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-1">
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.floor(rating) ? 'fill-current' : 'text-muted',
                )}
              />
            ))}
          </div>
          <span className="font-medium text-foreground">{rating}</span>
          <span>({reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  )
}
