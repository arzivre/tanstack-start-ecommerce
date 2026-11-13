import { Link } from '@tanstack/react-router'
import { FileQuestion, Home, RotateCcw } from 'lucide-react'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-[50vh] min-w-0 flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 shadow-xl backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center gap-2 pb-2 text-center">
          <div className="rounded-full bg-muted p-4 ring-1 ring-muted-foreground/20">
            <FileQuestion className="size-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <div className="text-sm text-muted-foreground">
            {children || (
              <p>
                The page you are looking for doesn't exist or has been moved.
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <div className="font-mono text-9xl font-black text-muted-foreground/20 select-none">
            404
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="w-full gap-2 sm:flex-1"
          >
            <RotateCcw className="size-4" />
            Go Back
          </Button>
          <Button asChild className="w-full gap-2 sm:flex-1">
            <Link to="/">
              <Home className="size-4" />
              Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-8 text-sm text-muted-foreground">
        <Link
          to="/"
          className="transition-colors hover:text-foreground hover:underline"
        >
          Return to Home Page
        </Link>
      </div>
    </div>
  )
}
