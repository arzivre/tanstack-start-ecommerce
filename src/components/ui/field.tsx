import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '#/lib/utils'

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical'
  }
>(({ className, orientation = 'vertical', ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        'group/field flex flex-col gap-2',
        orientation === 'horizontal' && 'flex-row items-center',
        className,
      )}
      {...props}
    />
  )
})
Field.displayName = 'Field'

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="field-group"
      className={cn('flex flex-col gap-5', className)}
      {...props}
    />
  )
})
FieldGroup.displayName = 'FieldGroup'

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    asChild?: boolean
    required?: boolean
  }
>(({ className, asChild = false, required, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'label'
  return (
    <Comp
      ref={ref}
      data-slot="field-label"
      className={cn(
        'text-sm leading-none font-medium text-foreground group-data-[invalid=true]/field:text-destructive peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </Comp>
  )
})
FieldLabel.displayName = 'FieldLabel'

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="field-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
FieldDescription.displayName = 'FieldDescription'

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    errors?: unknown
  }
>(({ className, errors, children, ...props }, ref) => {
  // Convert errors to string array
  const errorArray = Array.isArray(errors)
    ? errors.filter((e): e is string => typeof e === 'string')
    : []

  const body = errorArray.length > 0 ? errorArray.join(', ') : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      data-slot="field-error"
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FieldError.displayName = 'FieldError'

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError }
