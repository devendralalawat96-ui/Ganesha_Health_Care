import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin, destroySession } from "@/lib/auth";
import { site } from "@/lib/site";

export const metadata = { robots: { index: false, follow: false } };

async function signOut() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/caregivers", label: "Caregivers" },
  { href: "/admin/salary", label: "Salary" },
];

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, never>>;
}) {
  void params;
  const admin = await getAdmin();

  // The login page renders inside this layout but must stay reachable when signed out.
  if (!admin) return <>{children}</>;

  return (
    <div className="container-page py-8">
      <div
        data-print="hide"
        className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4"
      >
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-serif text-lg">
            {site.shortName} Admin
          </Link>
          <nav className="flex flex-wrap gap-4" aria-label="Admin">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-[13.5px] font-medium text-inksoft hover:text-brand">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[12.5px] text-sage">{admin.email}</span>
          <form action={signOut}>
            <button type="submit" className="rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-medium text-inksoft hover:border-brand hover:text-brand">
              Sign out
            </button>
          </form>
        </div>
      </div>

      {children}
    </div>
  );
}
