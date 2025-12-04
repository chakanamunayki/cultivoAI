"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Download,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { useAdminContent } from "@/hooks/use-admin-content";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, labelKey: "dashboard" as const },
  { href: "/admin/leads", icon: Users, labelKey: "leads" as const },
  { href: "/admin/conversations", icon: MessageSquare, labelKey: "conversations" as const },
  { href: "/admin/export", icon: Download, labelKey: "export" as const },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const admin = useAdminContent();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">{admin.title}</h1>
            <p className="text-muted-foreground mb-6">
              Sign in to access the admin dashboard
            </p>
          </div>
          <UserProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{admin.nav.backToSite}</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="font-semibold">{admin.title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="container py-6">
        {/* Tab Navigation */}
        <nav className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "pointer-events-none"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{admin.nav[item.labelKey]}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
