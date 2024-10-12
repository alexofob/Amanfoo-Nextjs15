import type Icons from "@/components/shared/icons";

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
  href: string;
};

export type HeaderNavItem = Omit<SidebarNavItem, "icon">;

export type NavLinkNavItem = SidebarNavItem & {
  href?: string;
  items: NavLink[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type SelectItem = {
  label: string;
  value: string;
};

export type DashboardConfig = {
  headerNav: HeaderNavItem[];
  sidebarNav: SidebarNavItem[];
  adminSidebarNav: SidebarNavItem[];
  superAdminSidebarNav: SidebarNavItem[];
};
