"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, telHref, waHref } from "@/lib/site";

export default function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const tabs = [
    { href: "/", label: "Home", icon: HomeIcon, external: false },
    { href: "/services", label: "Services", icon: ListIcon, external: false },
    { href: "/book", label: "Book", icon: PlusIcon, external: false },
    { href: telHref(), label: "Call", icon: PhoneIcon, external: true },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur sm:hidden"
    >
      <div className="flex items-stretch justify-around px-1 py-1.5">
        {tabs.map((t) => {
          const active = !t.external && (t.href === "/" ? pathname === "/" : pathname.startsWith(t.href));
          const Icon = t.icon;
          const className = `flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 ${
            active ? "text-brand" : "text-sage"
          }`;
          const inner = (
            <>
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold">{t.label}</span>
            </>
          );

          return t.external ? (
            <a key={t.label} href={t.href} className={className}>
              {inner}
            </a>
          ) : (
            <Link key={t.label} href={t.href} className={className} aria-current={active ? "page" : undefined}>
              {inner}
            </Link>
          );
        })}

        {/* WhatsApp gets the brand green and a pulse — it is the action we most
            want families to take, so it should not read as just another tab. */}
        <a
          href={waHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[#128C7E]"
        >
          <span className="relative grid h-5 w-5 place-items-center">
            <span className="absolute inline-flex h-7 w-7 animate-ping rounded-full bg-[#25D366] opacity-20" />
            <WhatsAppIcon className="relative h-5 w-5" />
          </span>
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ListIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.43-4.4-1.2l-.32-.19-3.26.85.87-3.18-.2-.33A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}
