import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLockBody } from "@/lib/hooks/use-lock-body";
import { cn } from "@/lib/utils";
import Icons from "@/components/shared/icons";
import { type SidebarNavItem } from "@/types";

interface MobileNavProps {
  items: SidebarNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();
  const path = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 top-10 z-50 grid grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => {
            const Icon = Icons[item.icon || "arrowRight"];
            return (
              <Link key={index} href="/" className="py-2">
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className="mr-2 h-6 w-6 shrink-0" />
                  <span>{item.title}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}
