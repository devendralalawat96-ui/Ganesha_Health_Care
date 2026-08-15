import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inr, shortDate } from "@/lib/format";
import { site, upiHref } from "@/lib/site";
import { recordPayment, cancelInvoice } from "../actions";
import ShareInvoiceButtons from "@/components/ShareInvoiceButtons";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { payments: { orderBy: { paidAt: "desc" } } },
  });
  if (!invoice) notFound();

  const due = invoice.amount - invoice.paidAmount;
  const settled = invoice.status === "PAID" || invoice.status === "CANCELLED";
  const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <h1 className="text-2xl">Invoice {invoice.number}</h1>
        <div className="flex items-center gap-4">
          {invoice.status !== "CANCELLED" && (
            <Link
              href={`/admin/invoices/${invoice.id}/edit`}
              className="rounded-lg border border-line px-3.5 py-2 text-[13.5px] font-medium text-inksoft transition hover:border-brand hover:text-brand"
            >
              Edit invoice
            </Link>
          )}
          <Link href="/admin/invoices" className="text-[13.5px] font-medium text-inksoft hover:text-brand">
            ← Back to invoices
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="relative overflow-hidden card" data-print="sheet">
          {/* Watermark, echoing the Ganesha printed on their paper invoice pad. */}
          <Logo
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 text-brand/[0.05]"
          />

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
              <p className="text-[12px] uppercase tracking-wider text-sage">Invoice</p>
              <p className="font-serif text-lg text-brand">{invoice.number}</p>
              <p className="mt-1 text-[12.5px] text-sage">{shortDate(invoice.issuedAt)}</p>
              <p className="mt-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                {invoice.status}
              </p>
            </div>
          </div>

          <div className="relative mt-6">
            <p className="text-[12px] uppercase tracking-wider text-sage">Billed to</p>
            <p className="mt-1.5 font-medium">{invoice.patientName}</p>
            <p className="text-[13px] text-inksoft">{invoice.patientPhone}</p>
            {invoice.patientAddr && <p className="text-[13px] text-inksoft">{invoice.patientAddr}</p>}
          </div>

          <table className="relative mt-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-[12px] uppercase tracking-wider text-sage">
                <th className="py-2.5 font-semibold">Service</th>
                <th className="py-2.5 font-semibold">Period</th>
                <th className="py-2.5 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line/60">
                <td className="py-3.5 text-[14px]">
                  {/* An invoice can cover several services, stored comma-separated. */}
                  <ul className="space-y-1">
                    {invoice.serviceName
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                  </ul>
                </td>
                <td className="py-3.5 align-top text-[13px] text-inksoft">
                  {shortDate(invoice.periodFrom)} – {shortDate(invoice.periodTo)}
                </td>
                <td className="py-3.5 text-right align-top text-[14px] font-medium">
                  {inr(invoice.amount)}
                </td>
              </tr>
            </tbody>
          </table>

          <dl className="relative mt-5 ml-auto max-w-[280px] space-y-2 text-[13.5px]">
            <div className="flex justify-between">
              <dt className="text-inksoft">Total</dt>
              <dd className="font-medium">{inr(invoice.amount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-inksoft">Paid</dt>
              <dd className="font-medium">{inr(invoice.paidAmount)}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-brand-soft/50 px-3 py-2">
              <dt className="font-semibold text-brand-dark">Amount due</dt>
              <dd className="font-serif text-lg text-brand">{inr(due)}</dd>
            </div>
          </dl>

          {invoice.notes && (
            <div className="relative mt-6 border-t border-line pt-4">
              <p className="text-[12px] uppercase tracking-wider text-sage">Notes</p>
              <p className="mt-1 text-[13px] leading-relaxed text-inksoft">{invoice.notes}</p>
            </div>
          )}

          {/* Letterhead footer — only meaningful on paper. */}
          <div className="relative mt-10 hidden border-t border-line pt-4 print:block">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] leading-relaxed text-sage">
                  Payments accepted by UPI, cash, bank transfer or cheque.
                  {due > 0 && ` Amount due: ${inr(due)}.`}
                </p>
                <p className="mt-1 text-[11px] text-sage">
                  Queries: {site.phoneDisplay} · Available 24×7
                </p>
              </div>
              <p className="shrink-0 text-[11px] text-sage">
                This is a computer-generated invoice.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-5 print:hidden">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage">Status</p>
            <p className="mt-2 font-serif text-xl text-brand">{invoice.status}</p>

            <ShareInvoiceButtons
              number={invoice.number}
              patientName={invoice.patientName}
              patientPhone={invoice.patientPhone}
              serviceName={invoice.serviceName}
              amount={invoice.amount}
              due={due}
              upiLink={due > 0 ? upiHref(due, `Invoice ${invoice.number}`) : ""}
            />
          </div>

          {!settled && (
            <form action={recordPayment} className="card space-y-4">
              <input type="hidden" name="invoiceId" value={invoice.id} />
              <p className="font-serif text-base">Record a payment</p>

              <div>
                <label htmlFor="amount" className="text-[13px] font-semibold">Amount (₹)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min={1}
                  max={due}
                  step={1}
                  defaultValue={due}
                  required
                  className={field}
                />
              </div>

              <div>
                <label htmlFor="method" className="text-[13px] font-semibold">Method</label>
                <select id="method" name="method" defaultValue="UPI" className={field}>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank transfer">Bank transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label htmlFor="reference" className="text-[13px] font-semibold">
                  Reference <span className="font-normal text-sage">(optional)</span>
                </label>
                <input id="reference" name="reference" className={field} />
              </div>

              <button type="submit" className="btn-primary w-full">Record payment</button>
            </form>
          )}

          {invoice.payments.length > 0 && (
            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-wider text-sage">Payment history</p>
              <ul className="mt-3 space-y-3">
                {invoice.payments.map((p) => (
                  <li key={p.id} className="border-b border-line/60 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between text-[13.5px]">
                      <span className="font-medium">{inr(p.amount)}</span>
                      <span className="text-sage">{shortDate(p.paidAt)}</span>
                    </div>
                    <p className="text-[12.5px] text-inksoft">
                      {p.method}
                      {p.reference && ` · ${p.reference}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {invoice.status !== "CANCELLED" && invoice.paidAmount === 0 && (
            <form action={cancelInvoice}>
              <input type="hidden" name="invoiceId" value={invoice.id} />
              <button type="submit" className="w-full rounded-lg border border-alert/40 px-4 py-2.5 text-[13px] font-semibold text-alert hover:bg-alert/5">
                Cancel this invoice
              </button>
            </form>
          )}
        </aside>
      </div>
    </>
  );
}
