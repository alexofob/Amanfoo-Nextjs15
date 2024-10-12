"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { UserAvatar } from "@/components/layout/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type AuthUser } from "@/domain/models/senior";
import { type SidebarNavItem } from "@/types";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SidebarNavItem[];
  user: Pick<AuthUser, "name" | "email" | "imageUrl">;
}

export default function UserAccountNav({ items, user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={{ ...user }} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
            )}
          </div>
        </div>
        {!!items && <DropdownMenuSeparator />}
        {!!items &&
          items.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link href={item.href}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
