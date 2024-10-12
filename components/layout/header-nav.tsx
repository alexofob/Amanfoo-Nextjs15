"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import amanfooLogo from "~/public/amanfoo-logo.png";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Icons from "@/components/shared/icons";
import { type HeaderNavItem } from "@/types";

interface HeaderNavProps {
  items?: HeaderNavItem[];
  showMobileMenu: boolean;
  setShowMobileMenu: (showMobileMenu: boolean) => void;
}

export default function HeaderNav({ items, showMobileMenu, setShowMobileMenu }: HeaderNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex gap-12">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Image
          alt="Prempeh College logo"
          src={amanfooLogo}
          width={60}
          height={60}
          className="mx-auto"
          placeholder="blur"
        />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`) ? "text-foreground" : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
      </button>

      <Link href="/" className="flex items-center space-x-2 lg:hidden">
        <Image
          alt="Prempeh College logo"
          src={amanfooLogo}
          width={60}
          height={60}
          className="mx-auto"
          placeholder="blur"
        />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
    </div>
  );
}
