import { AccountLayout } from '#/components/containers/store/accounts/account-layout'
import { OrdersTable } from './order-table'

export function OrderTemplate() {
  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <OrdersTable />
        </div>
      </div>
    </AccountLayout>
  )
}
