"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminContent } from "@/hooks/use-admin-content";
import type { LeadWithConversations, LeadsListResponse } from "@/types/admin";

// Status badge colors
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  warm: "bg-yellow-100 text-yellow-800",
  hot: "bg-orange-100 text-orange-800",
  priority: "bg-red-100 text-red-800",
  contacted: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
};

const qualificationColors: Record<string, string> = {
  cold: "bg-slate-100 text-slate-800",
  warm: "bg-yellow-100 text-yellow-800",
  hot: "bg-orange-100 text-orange-800",
  priority: "bg-red-100 text-red-800",
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminLeadsPage() {
  const admin = useAdminContent();
  const [leads, setLeads] = useState<LeadWithConversations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    hasMore: false,
  });

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });

      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error("Failed to fetch leads");

      const data: LeadsListResponse = await res.json();
      setLeads(data.leads);
      setPagination({
        totalCount: data.pagination.totalCount,
        totalPages: data.pagination.totalPages,
        hasMore: data.pagination.hasMore,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
  };

  const hasFilters = search || statusFilter;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={admin.actions.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All Statuses</option>
              {Object.entries(admin.leadStatus).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                {admin.actions.clearFilters}
              </Button>
            )}
            <Button variant="outline" size="icon" onClick={fetchLeads}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchLeads}>{admin.actions.refresh}</Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{admin.nav.leads}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {pagination.totalCount} total
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            ) : leads.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                {admin.table.noData}
              </p>
            ) : (
              <>
                {/* Mobile Cards / Desktop Table */}
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium">
                            {lead.name || "No name"}
                          </span>
                          <Badge className={statusColors[lead.status || "new"]}>
                            {admin.leadStatus[lead.status as keyof typeof admin.leadStatus] || lead.status}
                          </Badge>
                          {lead.qualificationLevel && (
                            <Badge
                              variant="outline"
                              className={qualificationColors[lead.qualificationLevel]}
                            >
                              {lead.qualificationScore}/5
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{lead.email}</p>
                          <div className="flex flex-wrap gap-3">
                            <span>{admin.table.source}: {lead.source || "-"}</span>
                            <span>{admin.table.date}: {formatDate(lead.createdAt)}</span>
                            {lead.conversationCount > 0 && (
                              <span>{lead.conversationCount} conversations</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {lead.whatsapp && (
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <a
                              href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={admin.actions.whatsapp}
                            >
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                          <a href={`mailto:${lead.email}`} title={admin.actions.email}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                        <Link href={`/admin/leads/${lead.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">{admin.actions.viewDetails}</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Page {page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={!pagination.hasMore}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
