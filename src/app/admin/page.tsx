import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inr } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await requireAdmin();

  let stats = { unpaid: 0, outstanding: 0, collectedThisMonth: 0, caregivers: 0, unpaidSalaries: 0 };
  let dbError = false;

  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [unpaidInvoices, caregiverCount, unpaidSalaryCount, monthPayments] = await Promise.all([
      prisma.invoice.findMany({
        where: { status: { in: ["UNPAID", "PARTIAL"] } },
        select: { amount: true, paidAmount: true },
      }),
      prisma.caregiver.count({ where: { active: true } }),
      prisma.salaryRecord.count({ where: { paid: false } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { paidAt: { gte: monthStart } } }),
    ]);

    stats = {
      unpaid: unpaidInvoices.length,
      outstanding: unpaidInvoices.reduce((sum, i) => sum + (i.amount - i.paidAmount), 0),
      collectedThisMonth: monthPayments._sum.amount ?? 0,
      caregivers: caregiverCount,
      unpaidSalaries: unpaidSalaryCount,
    };
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="card mt-8 border-dashed">
        <p className="font-serif text-lg">Database not connected</p>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-inksoft">
          Set <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">DATABASE_URL</code> to your
          Neon connection string and run <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">npx prisma migrate deploy</code>{" "}
          to create the tables. The public site works without this — only the admin tools need it.
        </p>
      </div>
    );
  }

  const cards = [
    { label: "Outstanding", value: inr(stats.outstanding), sub: `${stats.unpaid} unpaid invoices`, href: "/admin/invoices" },
    { label: "Collected this month", value: inr(stats.collectedThisMonth), sub: "Across all invoices", href: "/admin/invoices" },
    { label: "Active caregivers", value: String(stats.caregivers), sub: "Shown on the public site", href: "/admin/caregivers" },
    { label: "Unpaid salaries", value: String(stats.unpaidSalaries), sub: "Records awaiting payment", href: "/admin/salary" },
  ];

  return (
    <>
      <h1 className="mt-8 text-2xl">Overview</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card transition hover:border-brand">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">{c.label}</p>
            <p className="mt-2 font-serif text-2xl text-brand">{c.value}</p>
            <p className="mt-1 text-[12.5px] text-inksoft">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/invoices/new" className="btn-primary">New invoice</Link>
        <Link href="/admin/caregivers/new" className="btn-outline">Add caregiver</Link>
        <Link href="/admin/salary" className="btn-outline">Record salary</Link>
      </div>
    </>
  );
}
