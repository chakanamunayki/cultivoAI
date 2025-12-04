"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Phone,
  Calendar,
  Eye,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminContent } from "@/hooks/use-admin-content";
import type { DashboardStats, LeadWithConversations } from "@/types/admin";

// Status badge colors
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  warm: "bg-yellow-100 text-yellow-800",
  hot: "bg-orange-100 text-orange-800",
  priority: "bg-red-100 text-red-800",
  contacted: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatsCard({
  title,
  value,
  icon: Icon,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const admin = useAdminContent();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadWithConversations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [statsRes, leadsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/leads?limit=5"),
        ]);

        if (!statsRes.ok || !leadsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const statsData = await statsRes.json();
        const leadsData = await leadsRes.json();

        setStats(statsData);
        setRecentLeads(leadsData.leads);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          {admin.actions.refresh}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : stats ? (
          <>
            <StatsCard
              title={admin.stats.totalLeads}
              value={stats.leads.total}
              icon={Users}
              subtitle={`${stats.leads.thisWeek} ${admin.stats.thisWeek.toLowerCase()}`}
            />
            <StatsCard
              title={admin.stats.conversations}
              value={stats.conversations.total}
              icon={MessageSquare}
              subtitle={`${stats.conversations.avgMessages} ${admin.stats.avgMessages.toLowerCase()}`}
            />
            <StatsCard
              title={admin.stats.leadCapture}
              value={`${stats.engagement.leadCaptureRate}%`}
              icon={TrendingUp}
              subtitle={`${stats.conversations.withLeadCapture} leads captured`}
            />
            <StatsCard
              title={admin.stats.whatsappClicks}
              value={stats.engagement.whatsappClicks}
              icon={Phone}
            />
          </>
        ) : null}
      </div>

      {/* Status Breakdown */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.leads.byStatus).map(([status, count]) => (
                <div
                  key={status}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                >
                  <Badge className={statusColors[status] || "bg-gray-100"}>
                    {admin.leadStatus[status as keyof typeof admin.leadStatus] || status}
                  </Badge>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Leads</CardTitle>
          <Link href="/admin/leads">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentLeads.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {admin.table.noData}
            </p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">
                        {lead.name || lead.email}
                      </span>
                      <Badge className={statusColors[lead.status || "new"] || "bg-gray-100"}>
                        {admin.leadStatus[lead.status as keyof typeof admin.leadStatus] || lead.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(lead.createdAt)}
                      </span>
                      {lead.conversationCount > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {lead.conversationCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.whatsapp && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8"
                      >
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8"
                    >
                      <a href={`mailto:${lead.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Link href={`/admin/leads/${lead.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
