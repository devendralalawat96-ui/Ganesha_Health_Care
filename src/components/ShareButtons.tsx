"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ShareButtons({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[13px] font-semibold text-inksoft">Share this page:</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-line px-3 py-1.5 text-[13px] font-medium text-inksoft hover:border-brand hover:text-brand"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg border border-line px-3 py-1.5 text-[13px] font-medium text-inksoft hover:border-brand hover:text-brand"
      >
        {copied ? "Link copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
