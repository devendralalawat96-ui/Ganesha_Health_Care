import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { services } from "@/lib/services";
import ServicePicker from "@/components/ServicePicker";
import { createInvoice } from "../actions";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { error } = await searchParams;

  const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand";

  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl">New invoice</h1>
        <Link href="/admin/invoices" className="text-[13.5px] font-medium text-inksoft hover:text-brand">
          ← Back to invoices
        </Link>
      </div>

      {error && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          Please check the form — some fields were missing or invalid.
        </p>
      )}

      <form action={createInvoice} className="mt-6 max-w-2xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="patientName" className="text-[13px] font-semibold">Patient name</label>
            <input id="patientName" name="patientName" required className={field} />
          </div>
          <div>
            <label htmlFor="patientPhone" className="text-[13px] font-semibold">Phone</label>
            <input id="patientPhone" name="patientPhone" required inputMode="tel" className={field} />
          </div>
        </div>

        <div>
          <label htmlFor="patientAddr" className="text-[13px] font-semibold">
            Address <span className="font-normal text-sage">(optional)</span>
          </label>
          <input id="patientAddr" name="patientAddr" className={field} />
        </div>

        <ServicePicker options={services.map((s) => s.name)} />

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="periodFrom" className="text-[13px] font-semibold">Period from</label>
            <input id="periodFrom" name="periodFrom" type="date" required className={field} />
          </div>
          <div>
            <label htmlFor="periodTo" className="text-[13px] font-semibold">Period to</label>
            <input id="periodTo" name="periodTo" type="date" required className={field} />
          </div>
          <div>
            <label htmlFor="amount" className="text-[13px] font-semibold">Amount (₹)</label>
            <input id="amount" name="amount" type="number" min={1} step={1} required inputMode="numeric" className={field} />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="text-[13px] font-semibold">
            Notes <span className="font-normal text-sage">(optional)</span>
          </label>
          <textarea id="notes" name="notes" rows={3} className={field} />
        </div>

        <button type="submit" className="btn-primary">Create invoice</button>
      </form>
    </>
  );
}
