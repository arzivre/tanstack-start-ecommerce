import { cn } from '#/lib/utils'
import { Clock } from 'lucide-react'

interface ShippingUpdate {
  id: string
  timestamp: string
  location: string
  status: string
  isLatest?: boolean
}

interface ShippingUpdatesListProps {
  updates: ShippingUpdate[]
}

export function ShippingUpdatesList({ updates }: ShippingUpdatesListProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Shipping Updates</h3>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div
            key={update.id}
            className={cn(
              'relative flex gap-4 pb-4',
              index < updates.length - 1 && 'border-b',
            )}
          >
            {/* Timeline dot */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  update.isLatest
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                <Clock className="h-4 w-4" />
              </div>
              {index < updates.length - 1 && (
                <div className="mt-2 h-full w-0.5 flex-1 bg-muted" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={cn(
                      'font-medium',
                      update.isLatest && 'text-primary',
                    )}
                  >
                    {update.status}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {update.location}
                  </p>
                </div>
                <p className="text-sm whitespace-nowrap text-muted-foreground">
                  {update.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
