import * as React from "react";

import { cn } from "@/lib/utils";

type PageShellProps = React.HTMLAttributes<HTMLDivElement>;

export default function PageShell({ children, className, ...props }: PageShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
}
