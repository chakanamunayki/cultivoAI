"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  User,
  Briefcase,
  AlertTriangle,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAdminContent } from "@/hooks/use-admin-content";
import type { LeadDetailsResponse, ConversationWithMessages } from "@/types/admin";

// Status colors
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
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function QualificationItem({
  label,
  value,
}: {
  label: string;
  value: boolean | null;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      {value ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 text-muted-foreground" />
      )}
    </div>
  );
}

function ConversationCard({
  conversation,
  admin,
}: {
  conversation: ConversationWithMessages;
  admin: ReturnType<typeof useAdminContent>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {conversation.messageCount} {admin.leadDetails.messages}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatShortDate(conversation.startedAt)}
                {conversation.durationMinutes && (
                  <> · {conversation.durationMinutes} {admin.leadDetails.duration}</>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {conversation.escalatedToHuman && (
              <Badge variant="destructive">{admin.leadDetails.escalated}</Badge>
            )}
            {conversation.leadCaptured && (
              <Badge className="bg-green-100 text-green-800">Lead</Badge>
            )}
          </div>
        </div>
        {conversation.summary && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {conversation.summary}
          </p>
        )}
      </button>

      {expanded && (
        <div className="border-t bg-muted/30 p-4 space-y-3 max-h-96 overflow-y-auto">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {formatShortDate(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeadDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const admin = useAdminContent();
  const [data, setData] = useState<LeadDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchLead() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/leads/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Lead not found");
          throw new Error("Failed to fetch lead");
        }
        const leadData: LeadDetailsResponse = await res.json();
        setData(leadData);
        setNotes(leadData.lead.notes || "");
        setStatus(leadData.lead.status || "new");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchLead();
  }, [id]);

  const handleSaveNotes = async () => {
    try {
      setSavingNotes(true);
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: id, notes }),
      });
      if (!res.ok) throw new Error("Failed to save notes");
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      setStatus(newStatus);
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: id, status: newStatus }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-destructive mb-4">{error || "Lead not found"}</p>
        <Button onClick={() => router.push("/admin/leads")}>
          Back to Leads
        </Button>
      </div>
    );
  }

  const { lead, conversations } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/leads">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{lead.name || lead.email}</h1>
            <p className="text-muted-foreground">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {lead.whatsapp && (
            <Button variant="outline" asChild>
              <a
                href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4 mr-2" />
                {admin.actions.whatsapp}
              </a>
            </Button>
          )}
          <Button variant="outline" asChild>
            <a href={`mailto:${lead.email}`}>
              <Mail className="h-4 w-4 mr-2" />
              {admin.actions.email}
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                {admin.leadDetails.contactInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{admin.table.email}</span>
                <span>{lead.email}</span>
              </div>
              {lead.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{admin.table.phone}</span>
                  <span>{lead.phone}</span>
                </div>
              )}
              {lead.whatsapp && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp</span>
                  <span>{lead.whatsapp}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{admin.table.status}</span>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`px-2 py-1 rounded text-sm font-medium border-0 ${statusColors[status]}`}
                >
                  {Object.entries(admin.leadStatus).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{admin.table.source}</span>
                <span>{lead.source || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{admin.table.date}</span>
                <span>{formatDate(lead.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          {(lead.projectType || lead.projectDescription || lead.budgetRange) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {admin.leadDetails.projectInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lead.projectType && (
                  <div>
                    <span className="text-muted-foreground text-sm">Type</span>
                    <p>{lead.projectType}</p>
                  </div>
                )}
                {lead.projectDescription && (
                  <div>
                    <span className="text-muted-foreground text-sm">Description</span>
                    <p className="whitespace-pre-wrap">{lead.projectDescription}</p>
                  </div>
                )}
                {lead.budgetRange && (
                  <div>
                    <span className="text-muted-foreground text-sm">Budget</span>
                    <p>{lead.budgetRange}</p>
                  </div>
                )}
                {lead.timeline && (
                  <div>
                    <span className="text-muted-foreground text-sm">Timeline</span>
                    <p>{lead.timeline}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Qualification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{admin.leadDetails.qualificationBreakdown}</span>
                <Badge variant="outline" className="text-lg">
                  {lead.qualificationScore}/5
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QualificationItem
                label={admin.leadDetails.budget}
                value={lead.hasBudget}
              />
              <Separator />
              <QualificationItem
                label={admin.leadDetails.timeline}
                value={lead.hasTimeline}
              />
              <Separator />
              <QualificationItem
                label={admin.leadDetails.useCase}
                value={lead.hasClearUseCase}
              />
              <Separator />
              <QualificationItem
                label={admin.leadDetails.decisionMaker}
                value={lead.isDecisionMaker}
              />
              <Separator />
              <QualificationItem
                label={admin.leadDetails.sectorFit}
                value={lead.isSectorFit}
              />
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{admin.leadDetails.notes}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder={admin.leadDetails.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <Button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {admin.leadDetails.saveNotes}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Conversations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {admin.leadDetails.conversationHistory}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {admin.leadDetails.noConversations}
                </p>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conv) => (
                    <ConversationCard
                      key={conv.id}
                      conversation={conv}
                      admin={admin}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
