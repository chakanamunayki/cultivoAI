"use client";

import { adminContent, type AdminContent } from "@/content/admin";
import { useLocale } from "@/hooks/use-locale";

/**
 * Hook to access admin content based on current locale
 *
 * @returns {AdminContent} - Admin dashboard content in current language
 *
 * @example
 * ```tsx
 * function AdminComponent() {
 *   const admin = useAdminContent();
 *   return <h1>{admin.title}</h1>;
 * }
 * ```
 */
export function useAdminContent(): AdminContent {
  const { locale } = useLocale();
  return adminContent[locale];
}
