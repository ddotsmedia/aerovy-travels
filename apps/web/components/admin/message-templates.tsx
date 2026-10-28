"use client";

import { useState } from "react";
import { Card, CardContent, Button } from "@aerovy/ui";
import {
  DEFAULT_TEMPLATES,
  SAMPLE_VARS,
  TEMPLATE_LABELS,
  renderTemplate,
  useAdminStore,
  type TemplateKey,
} from "@/lib/store/admin";

const KEYS = Object.keys(TEMPLATE_LABELS) as TemplateKey[];

// Editable WhatsApp/email copy. Saved to localStorage via the admin store.
export function MessageTemplates() {
  const templates = useAdminStore((s) => s.templates);
  const setTemplate = useAdminStore((s) => s.setTemplate);
  const [previewKey, setPreviewKey] = useState<TemplateKey | null>(null);
  const [savedKey, setSavedKey] = useState<TemplateKey | null>(null);

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/60">
        Use <code className="text-[#CDA020]">{"{{name}}"}</code>,{" "}
        <code className="text-[#CDA020]">{"{{experience}}"}</code>,{" "}
        <code className="text-[#CDA020]">{"{{date}}"}</code>,{" "}
        <code className="text-[#CDA020]">{"{{bookingId}}"}</code>,{" "}
        <code className="text-[#CDA020]">{"{{amount}}"}</code> and{" "}
        <code className="text-[#CDA020]">{"{{reviewLink}}"}</code> as placeholders.
      </p>

      {KEYS.map((key) => (
        <Card key={key} className="border border-white/10 bg-[#161B22]">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{TEMPLATE_LABELS[key]}</h3>
              {templates[key] !== DEFAULT_TEMPLATES[key] && (
                <button
                  type="button"
                  onClick={() => setTemplate(key, DEFAULT_TEMPLATES[key])}
                  className="text-xs text-white/50 hover:text-white"
                >
                  Reset to default
                </button>
              )}
            </div>
            <textarea
              aria-label={TEMPLATE_LABELS[key]}
              rows={3}
              value={templates[key]}
              onChange={(e) => {
                setTemplate(key, e.target.value);
                setSavedKey(null);
              }}
              className="w-full rounded-md border border-white/10 bg-[#0D1117] px-4 py-2 text-sm text-white focus:border-[#CDA020] focus:outline-none"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewKey(previewKey === key ? null : key)}
              >
                {previewKey === key ? "Hide preview" : "Preview"}
              </Button>
              <Button
                className="bg-[#CDA020] text-black hover:bg-[#CDA020]/90"
                size="sm"
                onClick={() => setSavedKey(key)}
              >
                Save template
              </Button>
              {savedKey === key && (
                <span className="text-xs text-white/60">Saved to this browser</span>
              )}
            </div>
            {previewKey === key && (
              <div className="rounded-lg border border-white/10 bg-[#0D1117] p-4">
                <p className="text-xs tracking-wide text-white/50 uppercase">
                  Preview · sample data
                </p>
                <p className="mt-2 text-sm whitespace-pre-line text-white/90">
                  {renderTemplate(templates[key], SAMPLE_VARS)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
