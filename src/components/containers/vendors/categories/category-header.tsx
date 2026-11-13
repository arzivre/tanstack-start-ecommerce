import { Plus } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { PageHeader } from '#/components/base/common/page-header'

interface CategoryHeaderProps {
  onAddCategory: () => void
  className?: string
}

export default function CategoryHeader({
  onAddCategory,
  className,
}: CategoryHeaderProps) {
  return (
    <PageHeader
      title="Categories"
      description="Manage your product categories and organization"
      className={className}
    >
      <Button onClick={onAddCategory}>
        <Plus className="mr-2 size-4" />
        Add Category
      </Button>
    </PageHeader>
  )
}
