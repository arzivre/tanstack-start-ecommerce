import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'

interface NavItem {
  label: string
  to: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  linkClassName?: string
  activeLinkClassName?: string
}

export function Navbar({
  items,
  className = 'hidden items-center gap-6 text-sm @5xl:flex',
  linkClassName = '',
  activeLinkClassName = '',
}: NavBarProps) {
  return (
    <nav className={cn(className)}>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            'flex items-center justify-center rounded-xl border border-dashed bg-transparent px-7.5 text-lg transition-all hover:border-transparent hover:bg-primary hover:text-background @7xl:h-16 dark:text-body-70 dark:hover:text-background',
            linkClassName,
          )}
          activeProps={{
            className: cn(
              'h-12 rounded-xl border-transparent bg-foreground! px-[30px] text-lg text-background @7xl:h-16 dark:bg-body-10! hover:dark:text-foreground',
              activeLinkClassName,
            ),
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
