import { DataTable } from '#/components/base/data-table/data-table'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import type { AdminTenant } from '#/types/tenant'
import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

interface AdminTenantTableProps {
  tenants: AdminTenant[]
  className?: string
}

export function AdminTenantTable({
  tenants,
  className,
}: AdminTenantTableProps) {
  const columns: ColumnDef<AdminTenant>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="w-20 truncate text-xs text-muted-foreground">
          {row.getValue('id')}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Store Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue('name')}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.slug}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'ownerName',
      header: 'Owner',
      cell: ({ row }) => (
        <div>
          <div className="text-sm font-medium">{row.getValue('ownerName')}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.ownerEmail}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'plan',
      header: 'Plan',
      cell: ({ row }) => {
        const plan = row.getValue('plan') as AdminTenant['plan']
        return (
          <Badge variant="outline" className="capitalize">
            {plan}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as AdminTenant['status']
        return (
          <Badge
            variant={
              status === 'active'
                ? 'default'
                : status === 'suspended'
                  ? 'destructive'
                  : 'secondary'
            }
            className="capitalize"
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'productCount',
      header: 'Products',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('productCount')}</div>
      ),
    },
    {
      accessorKey: 'joinedDate',
      header: 'Joined',
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground">
          {new Date(row.getValue('joinedDate')).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Button variant="ghost" size="sm" asChild>
            <Link
              to="/admin/tenants/$tenantId"
              params={{ tenantId: row.original.id }}
            >
              View Details
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={tenants} className={className} />
}
