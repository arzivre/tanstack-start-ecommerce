import { cn } from '#/lib/utils'

interface PriceTagProps {
  price: number
  originalPrice?: number
  currency?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function PriceTag({
  price,
  originalPrice,
  currency = '$',
  className,
  size = 'md',
}: PriceTagProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-bold',
  }
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-semibold text-foreground', sizeClasses[size])}>
        {currency}
        {price.toFixed(2)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through">
          {currency}
          {originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  )
}
