import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  segments: {
    name: string
    href?: string
  }[]
  separator?: React.ReactNode
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center text-sm", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {segments.map((segment, index) => (
          <li key={segment.name} className="flex items-center">
            {index > 0 && (
              <span
                className="mx-2 text-muted-foreground"
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
            {segment.href ? (
              <a
                href={segment.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {segment.name}
              </a>
            ) : (
              <span className="font-medium">{segment.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
