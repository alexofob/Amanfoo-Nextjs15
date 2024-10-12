"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import HeaderNav from "@/components/layout/header-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { type SidebarNavItem } from "@/types";

type Props = {
  userAccount: React.ReactNode;
  mobileItems?: SidebarNavItem[];
};

export default function Header({ userAccount, mobileItems = dashboardConfig.sidebarNav }: Props) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setShowMobileMenu(false); // close menu if path changes!
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <HeaderNav
            items={dashboardConfig.headerNav}
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
          />
          {userAccount}
        </div>
      </header>
      {showMobileMenu && mobileItems ? <MobileNav items={mobileItems} /> : null}
    </>
  );
}
