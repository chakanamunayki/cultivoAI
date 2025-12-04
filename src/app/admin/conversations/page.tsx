"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminContent } from "@/hooks/use-admin-content";
import type { Conversation, ConversationsListResponse } from "@/types/admin";

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

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="text-center p-3 bg-muted/50 rounded-lg">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function AdminConversationsPage() {
  const admin = useAdminContent();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [metrics, setMetrics] = useState<ConversationsListResponse["metrics"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    hasMore: false,
  });

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/admin/conversations?${params}`);
      if (!res.ok) throw new Error("Failed to fetch conversations");

      const data: ConversationsListResponse = await res.json();
      setConversations(data.conversations);
      setMetrics(data.metrics);
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
  }, [page]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={fetchConversations}>{admin.actions.refresh}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics */}
      {metrics && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricCard
                label={admin.stats.avgMessages}
                value={metrics.avgMessages}
              />
              <MetricCard
                label={admin.stats.avgDuration}
                value={`${metrics.avgDurationMinutes}m`}
              />
              <MetricCard
                label={admin.stats.leadCapture}
                value={`${metrics.leadCaptureRate}%`}
              />
              <MetricCard
                label="Escalation Rate"
                value={`${metrics.escalationRate}%`}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversations List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {admin.nav.conversations}
            <span className="text-sm font-normal text-muted-foreground">
              ({pagination.totalCount})
            </span>
          </CardTitle>
          <Button variant="outline" size="icon" onClick={fetchConversations}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No conversations yet
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-medium">
                            {conv.messageCount} {admin.leadDetails.messages}
                          </span>
                          {conv.leadCaptured && (
                            <Badge className="bg-green-100 text-green-800">Lead</Badge>
                          )}
                          {conv.escalatedToHuman && (
                            <Badge variant="destructive">Escalated</Badge>
                          )}
                          {conv.intentDetected && (
                            <Badge variant="outline">{conv.intentDetected}</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {conv.leadEmail && (
                            <p className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {conv.leadName || conv.leadEmail}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(conv.startedAt)}
                            </span>
                            {conv.durationMinutes && (
                              <span>{conv.durationMinutes} min</span>
                            )}
                            {conv.language && (
                              <span className="uppercase">{conv.language}</span>
                            )}
                          </div>
                        </div>
                        {conv.summary && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {conv.summary}
                          </p>
                        )}
                      </div>
                    </div>
                    {conv.leadId && (
                      <Link href={`/admin/leads/${conv.leadId}`}>
                        <Button variant="outline" size="sm">
                          View Lead
                        </Button>
                      </Link>
                    )}
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
    </div>
  );
}
