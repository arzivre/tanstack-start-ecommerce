import type React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  className?: string
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}
