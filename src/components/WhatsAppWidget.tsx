"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site, waHref } from "@/lib/site";

const topics = [
  { label: "Elderly care at home", msg: "Hi, I need elderly care at home. Could you tell me about your caregivers and charges?" },
  { label: "Nurse after surgery", msg: "Hi, we need a nurse at home for post-surgery recovery care. What is available?" },
  { label: "Bedridden patient care", msg: "Hi, I need a caretaker for a bedridden patient. Please share the details." },
  { label: "ICU setup at home", msg: "Hi, I want to know about setting up ICU care at home — equipment and nursing." },
  { label: "Medical equipment rental", msg: "Hi, I would like to rent medical equipment. What do you have available?" },
  { label: "Something else", msg: `Hi, I need home care support from ${site.shortName}.` },
];

const NUDGE_KEY = "ganesha-wa-nudged";

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Gentle one-time nudge — never a forced modal.
  useEffect(() => {
    if (sessionStorage.getItem(NUDGE_KEY)) return;
    const t = setTimeout(() => setNudge(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    sessionStorage.setItem(NUDGE_KEY, "1");
  };

  // Close on Escape, and click outside.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // On phones the bottom tab bar already carries WhatsApp, so this widget would
  // be a second entry point for the same action. Desktop has no tab bar.
  if (pathname.startsWith("/admin")) return null;

  const toggle = () => {
    dismissNudge();
    setOpen((o) => !o);
  };

  return (
    <div className="hidden sm:block">
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Chat on WhatsApp"
        aria-hidden={!open}
        className={`fixed bottom-24 right-6 z-50 w-[min(22rem,calc(100vw-3rem))] origin-bottom-right overflow-hidden rounded-2xl border border-line bg-white shadow-2xl transition-all duration-200 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3 bg-[#075E54] px-4 py-3.5 text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 font-serif text-lg">
            G
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-semibold leading-tight">{site.shortName}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-white/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              Typically replies within minutes
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="-mr-1 shrink-0 rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="bg-[#ECE5DD] px-4 py-4">
          <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink shadow-sm">
            Namaste 🙏 How can we help? Pick a topic and we&apos;ll continue on WhatsApp.
          </p>
        </div>

        <div className="max-h-[15rem] overflow-y-auto border-t border-line bg-white p-3">
          <div className="flex flex-col gap-1.5">
            {topics.map((t) => (
              <a
                key={t.label}
                href={waHref(t.msg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-2.5 text-[13.5px] font-medium text-ink transition hover:border-brand hover:bg-brand-soft"
              >
                {t.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0 text-sage">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Nudge bubble */}
      <div
        className={`fixed bottom-24 right-6 z-40 max-w-[15rem] rounded-2xl rounded-br-sm border border-line bg-white px-4 py-3 shadow-xl transition-all duration-300 ${
          nudge && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={dismissNudge}
          aria-label="Dismiss"
          className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line bg-white text-sage shadow transition hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" onClick={toggle} className="block text-left">
          <p className="text-[13px] leading-snug text-ink">
            Need a caregiver? Message us on WhatsApp — we reply within minutes.
          </p>
        </button>
      </div>

      {/* Launcher */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
      >
        {!open && !nudge && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25" />
        )}
        <span className="relative">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
              <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.2-.4.2-.4.5-1 .1-.2 0-.4 0-.5L9 7.6c-.2-.5-.4-.4-.6-.4H8c-.2 0-.5 0-.8.4-.3.4-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3 1.8.8 2.6.9 3.5.7.5-.1 1.7-.7 1.9-1.4.3-.7.3-1.2.2-1.4 0-.1-.2-.2-.5-.3Z" />
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
