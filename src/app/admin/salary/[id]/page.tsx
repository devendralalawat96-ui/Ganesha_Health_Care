import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inr, monthName, shortDate } from "@/lib/format";
import { site } from "@/lib/site";
import { toggleSalaryPaid } from "../actions";
import ShareSlipButtons from "@/components/ShareSlipButtons";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function SalarySlipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const record = await prisma.salaryRecord.findUnique({
    where: { id },
    include: { caregiver: true },
  });
  if (!record) notFound();

  const period = `${monthName(record.month)} ${record.year}`;
  const gross = record.baseAmount + record.bonus;

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <h1 className="text-2xl">Salary slip — {period}</h1>
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/salary/${record.id}/edit`}
            className="rounded-lg border border-line px-3.5 py-2 text-[13.5px] font-medium text-inksoft transition hover:border-brand hover:text-brand"
          >
            Edit slip
          </Link>
          <Link href="/admin/salary" className="text-[13.5px] font-medium text-inksoft hover:text-brand">
            ← Back to salary
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="relative overflow-hidden card" data-print="sheet">
          <Logo className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 text-brand/[0.05]" />

          <div className="relative flex items-start justify-between gap-6 border-b-2 border-brand pb-5">
            <div className="flex items-start gap-3.5">
              <Logo className="h-14 w-14 shrink-0 text-brand" />
              <div>
                <p className="font-serif text-lg leading-tight">{site.name}</p>
                <p className="font-deva text-[12px] text-brand" lang="sa">
                  {site.mottoSanskrit}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-sage">{site.addressInvoice}</p>
                <p className="text-[12px] text-sage">{site.phoneDisplay}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[12px] uppercase tracking-wider text-sage">Salary slip</p>
              <p className="font-serif text-lg text-brand">{period}</p>
              <p className="mt-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                {record.paid ? "Paid" : "Unpaid"}
              </p>
            </div>
          </div>

          <div className="relative mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[12px] uppercase tracking-wider text-sage">Employee</p>
              <p className="mt-1.5 font-medium">{record.caregiver.name}</p>
              <p className="text-[13px] text-inksoft">{record.caregiver.role}</p>
              {record.caregiver.phone && (
                <p className="text-[13px] text-inksoft">{record.caregiver.phone}</p>
              )}
            </div>
            <div className="sm:text-right">
              <p className="text-[12px] uppercase tracking-wider text-sage">Details</p>
              <p className="mt-1.5 text-[13px] text-inksoft">
                Pay period: <span className="font-medium text-ink">{period}</span>
              </p>
              {record.caregiver.idType && record.caregiver.idNumber && (
                <p className="text-[13px] text-inksoft">
                  {record.caregiver.idType}: {record.caregiver.idNumber}
                </p>
              )}
              {record.paid && record.paidAt && (
                <p className="text-[13px] text-inksoft">Paid on {shortDate(record.paidAt)}</p>
              )}
            </div>
          </div>

          <table className="relative mt-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-[12px] uppercase tracking-wider text-sage">
                <th className="py-2.5 font-semibold">Description</th>
                <th className="py-2.5 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line/60">
                <td className="py-3 text-[14px]">Base pay</td>
                <td className="py-3 text-right text-[14px]">{inr(record.baseAmount)}</td>
              </tr>
              {record.bonus > 0 && (
                <tr className="border-b border-line/60">
                  <td className="py-3 text-[14px]">Bonus / incentive</td>
                  <td className="py-3 text-right text-[14px]">{inr(record.bonus)}</td>
                </tr>
              )}
              <tr className="border-b border-line/60">
                <td className="py-3 text-[13.5px] font-medium">Gross pay</td>
                <td className="py-3 text-right text-[13.5px] font-medium">{inr(gross)}</td>
              </tr>
              {record.deductions > 0 && (
                <tr className="border-b border-line/60">
                  <td className="py-3 text-[14px] text-inksoft">Deductions</td>
                  <td className="py-3 text-right text-[14px] text-inksoft">
                    −{inr(record.deductions)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <dl className="relative mt-5 ml-auto max-w-[280px] space-y-2 text-[13.5px]">
            <div className="flex justify-between rounded-lg bg-brand-soft/50 px-3 py-2">
              <dt className="font-semibold text-brand-dark">Net pay</dt>
              <dd className="font-serif text-lg text-brand">{inr(record.netAmount)}</dd>
            </div>
          </dl>

          {record.notes && (
            <div className="relative mt-6 border-t border-line pt-4">
              <p className="text-[12px] uppercase tracking-wider text-sage">Notes</p>
              <p className="mt-1 text-[13px] leading-relaxed text-inksoft">{record.notes}</p>
            </div>
          )}

          <div className="relative mt-10 hidden border-t border-line pt-4 print:block">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] leading-relaxed text-sage">
                  Queries about this slip: {site.phoneDisplay}
                </p>
              </div>
              <p className="shrink-0 text-[11px] text-sage">
                This is a computer-generated salary slip.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-5 print:hidden">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">Status</p>
            <p className="mt-2 font-serif text-xl text-brand">{record.paid ? "PAID" : "UNPAID"}</p>

            <ShareSlipButtons
              caregiverName={record.caregiver.name}
              caregiverPhone={record.caregiver.phone}
              period={period}
              baseAmount={record.baseAmount}
              bonus={record.bonus}
              deductions={record.deductions}
              netAmount={record.netAmount}
              paid={record.paid}
            />
          </div>

          <form action={toggleSalaryPaid} className="card">
            <input type="hidden" name="id" value={record.id} />
            <input type="hidden" name="returnTo" value="slip" />
            <p className="font-serif text-base">
              {record.paid ? "Mark as unpaid" : "Mark as paid"}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-inksoft">
              {record.paid
                ? "Reverses the payment status on this slip."
                : "Records that this salary has been handed over."}
            </p>
            <button type="submit" className="btn-outline mt-4 w-full !py-2 !text-[13px]">
              {record.paid ? "Mark unpaid" : "Mark paid"}
            </button>
          </form>
        </aside>
      </div>
    </>
  );
}
