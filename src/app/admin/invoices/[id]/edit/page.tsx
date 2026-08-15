import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inr } from "@/lib/format";
import { services } from "@/lib/services";
import ServicePicker from "@/components/ServicePicker";
import { updateInvoice } from "../../actions";

export const dynamic = "force-dynamic";

/** Postgres DateTime → the yyyy-mm-dd that <input type="date"> expects. */
function dateValue(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default async function EditInvoicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { error } = await searchParams;

  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) notFound();

  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl">Edit invoice {invoice.number}</h1>
        <Link
          href={`/admin/invoices/${invoice.id}`}
          className="text-[13.5px] font-medium text-inksoft hover:text-brand"
        >
          ← Back to invoice
        </Link>
      </div>

      {error === "below-paid" && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          The total cannot be less than the {inr(invoice.paidAmount)} already recorded as paid.
          Delete a payment first if you need to reduce it further.
        </p>
      )}
      {error === "invalid" && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          Please check the form — some fields were missing or invalid.
        </p>
      )}

      {invoice.paidAmount > 0 && (
        <p className="mt-5 rounded-lg border border-line bg-cream px-4 py-3 text-[13px] text-inksoft">
          {inr(invoice.paidAmount)} has already been paid on this invoice. The total cannot be
          lowered below that amount.
        </p>
      )}

      <form action={updateInvoice} className="mt-6 max-w-2xl space-y-5">
        <input type="hidden" name="invoiceId" value={invoice.id} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="patientName" className="text-[13px] font-semibold">Patient name</label>
            <input
              id="patientName"
              name="patientName"
              required
              defaultValue={invoice.patientName}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="patientPhone" className="text-[13px] font-semibold">Phone</label>
            <input
              id="patientPhone"
              name="patientPhone"
              required
              inputMode="tel"
              defaultValue={invoice.patientPhone}
              className={field}
            />
          </div>
        </div>

        <div>
          <label htmlFor="patientAddr" className="text-[13px] font-semibold">
            Address <span className="font-normal text-sage">(optional)</span>
          </label>
          <input
            id="patientAddr"
            name="patientAddr"
            defaultValue={invoice.patientAddr ?? ""}
            className={field}
          />
        </div>

        <ServicePicker
          options={services.map((s) => s.name)}
          initial={invoice.serviceName.split(",").map((s) => s.trim()).filter(Boolean)}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="periodFrom" className="text-[13px] font-semibold">Period from</label>
            <input
              id="periodFrom"
              name="periodFrom"
              type="date"
              required
              defaultValue={dateValue(invoice.periodFrom)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="periodTo" className="text-[13px] font-semibold">Period to</label>
            <input
              id="periodTo"
              name="periodTo"
              type="date"
              required
              defaultValue={dateValue(invoice.periodTo)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-[13px] font-semibold">Amount (₹)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min={Math.max(1, invoice.paidAmount)}
              step={1}
              required
              inputMode="numeric"
              defaultValue={invoice.amount}
              className={field}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="text-[13px] font-semibold">
            Notes <span className="font-normal text-sage">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={invoice.notes ?? ""}
            className={field}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary">Save changes</button>
          <Link href={`/admin/invoices/${invoice.id}`} className="btn-outline">Cancel</Link>
        </div>
      </form>
    </>
  );
}
