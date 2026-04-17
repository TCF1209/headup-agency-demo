"use client";

import { useDropzone } from "react-dropzone";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_RESUME_TYPES,
  MAX_RESUME_SIZE_BYTES,
} from "@/lib/schemas/application";

type Props = {
  value?: File;
  onChange: (file: File | undefined) => void;
  hint?: string;
  dropHint?: string;
  removeLabel?: string;
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeDropzone({
  value,
  onChange,
  hint = "PDF, DOC, or DOCX up to 5 MB",
  dropHint = "Drop your resume here, or click to select",
  removeLabel = "Remove",
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_RESUME_TYPES.reduce<Record<string, string[]>>((acc, t) => {
      acc[t] = [];
      return acc;
    }, {}),
    maxSize: MAX_RESUME_SIZE_BYTES,
    multiple: false,
    onDrop: (accepted) => {
      if (accepted[0]) onChange(accepted[0]);
    },
  });

  if (value) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <FileText
            className="h-5 w-5 shrink-0 text-accent"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">
              {value.name}
            </p>
            <p className="text-xs text-muted">{formatBytes(value.size)}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-alt hover:text-ink"
          aria-label={removeLabel}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps({
        className: cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-center transition-colors",
          "cursor-pointer hover:border-ink hover:bg-surface-alt",
          isDragActive && "border-accent bg-accent-soft/40"
        ),
      })}
    >
      <input {...getInputProps()} />
      <Upload className="h-5 w-5 text-muted" aria-hidden />
      <p className="text-sm font-medium text-ink">{dropHint}</p>
      <p className="text-xs text-muted">{hint}</p>
    </div>
  );
}
