"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAdminContent } from "@/hooks/use-admin-content";

export default function AdminExportPage() {
  const admin = useAdminContent();
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleExport = async (format: "csv" | "json") => {
    try {
      setDownloading(true);
      const params = new URLSearchParams();

      if (status) params.set("status", status);
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);
      if (format === "json") params.set("format", "json");

      const res = await fetch(`/api/admin/export?${params}`);
      if (!res.ok) throw new Error("Export failed");

      if (format === "json") {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        downloadBlob(blob, `cultivoai-leads-${getDateStr()}.json`);
      } else {
        const blob = await res.blob();
        downloadBlob(blob, `cultivoai-leads-${getDateStr()}.csv`);
      }
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setDownloading(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getDateStr = () => new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            {admin.exportPage.title}
          </CardTitle>
          <CardDescription>{admin.exportPage.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{admin.exportPage.filterByStatus}</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">{admin.exportPage.allStatuses}</option>
                {Object.entries(admin.leadStatus).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>{admin.exportPage.filterByDate}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {admin.exportPage.from}
                  </Label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {admin.exportPage.to}
                  </Label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={() => handleExport("csv")}
              disabled={downloading}
              className="flex-1"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              {admin.exportPage.downloadCSV}
            </Button>
            <Button
              onClick={() => handleExport("json")}
              disabled={downloading}
              variant="outline"
              className="flex-1"
            >
              <FileJson className="h-4 w-4 mr-2" />
              {admin.exportPage.downloadJSON}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Export includes: ID, contact info, project details, qualification data,
            status, source, conversation count, notes, and timestamps.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
