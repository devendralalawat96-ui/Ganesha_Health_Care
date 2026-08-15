import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inr, shortDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const statusStyle: Record<string, string> = {
  PAID: "bg-brand-soft text-brand-dark",
  PARTIAL: "bg-amber-100 text-amber-800",
  UNPAID: "bg-alert/10 text-alert",
  CANCELLED: "bg-line text-sage",
};

export default async function InvoicesPage() {
  await requireAdmin();

  const invoices = await prisma.invoice.findMany({ orderBy: { issuedAt: "desc" } });

  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl">Invoices</h1>
        <Link href="/admin/invoices/new" className="btn-primary !py-2">New invoice</Link>
      </div>

      {invoices.length === 0 ? (
        <div className="card mt-6 border-dashed">
          <p className="text-[14px] text-inksoft">No invoices yet. Create the first one to get started.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-[12px] uppercase tracking-wider text-sage">
                <th className="py-3 pr-4 font-semibold">Number</th>
                <th className="py-3 pr-4 font-semibold">Patient</th>
                <th className="py-3 pr-4 font-semibold">Service</th>
                <th className="py-3 pr-4 font-semibold">Period</th>
                <th className="py-3 pr-4 font-semibold">Amount</th>
                <th className="py-3 pr-4 font-semibold">Due</th>
                <th className="py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="border-b border-line/60 hover:bg-white">
                  <td className="py-3.5 pr-4 text-[13.5px]">
                    <Link href={`/admin/invoices/${i.id}`} className="font-semibold text-brand hover:underline">
                      {i.number}
                    </Link>
                  </td>
                  <td className="py-3.5 pr-4 text-[13.5px]">
                    <span className="font-medium">{i.patientName}</span>
                    <span className="block text-[12px] text-sage">{i.patientPhone}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">{i.serviceName}</td>
                  <td className="py-3.5 pr-4 text-[13px] text-inksoft">
                    {shortDate(i.periodFrom)} – {shortDate(i.periodTo)}
                  </td>
                  <td className="py-3.5 pr-4 text-[13.5px] font-medium">{inr(i.amount)}</td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">
                    {i.status === "CANCELLED" ? "—" : inr(i.amount - i.paidAmount)}
                  </td>
                  <td className="py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[i.status]}`}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
