import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { monthName } from "@/lib/format";
import { updateSalary } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditSalaryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { error } = await searchParams;

  const record = await prisma.salaryRecord.findUnique({
    where: { id },
    include: { caregiver: { select: { name: true, role: true } } },
  });
  if (!record) notFound();

  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand";

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl">Edit salary slip</h1>
        <Link
          href={`/admin/salary/${record.id}`}
          className="text-[13.5px] font-medium text-inksoft hover:text-brand"
        >
          ← Back to slip
        </Link>
      </div>

      {error && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          {error === "negative"
            ? "Deductions cannot exceed base pay plus bonus."
            : "Please check the form — some fields were missing or invalid."}
        </p>
      )}

      <form action={updateSalary} className="card mt-6 max-w-3xl space-y-5">
        <input type="hidden" name="id" value={record.id} />

        <div>
          <p className="text-[12px] uppercase tracking-wider text-sage">Employee</p>
          <p className="mt-1 font-medium">{record.caregiver.name}</p>
          <p className="text-[13px] text-inksoft">{record.caregiver.role}</p>
          <p className="mt-1.5 text-[12.5px] text-sage">
            To pay a different caregiver, create a new record from the salary page.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="month" className="text-[13px] font-semibold">Month</label>
            <select id="month" name="month" required defaultValue={record.month} className={field}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{monthName(m)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="text-[13px] font-semibold">Year</label>
            <input id="year" name="year" type="number" required defaultValue={record.year} className={field} />
          </div>
          <div>
            <label htmlFor="baseAmount" className="text-[13px] font-semibold">Base pay (₹)</label>
            <input
              id="baseAmount"
              name="baseAmount"
              type="number"
              min={0}
              step={1}
              required
              defaultValue={record.baseAmount}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="bonus" className="text-[13px] font-semibold">Bonus (₹)</label>
            <input
              id="bonus"
              name="bonus"
              type="number"
              min={0}
              step={1}
              defaultValue={record.bonus}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="deductions" className="text-[13px] font-semibold">Deductions (₹)</label>
            <input
              id="deductions"
              name="deductions"
              type="number"
              min={0}
              step={1}
              defaultValue={record.deductions}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="notes" className="text-[13px] font-semibold">
              Notes <span className="font-normal text-sage">(optional)</span>
            </label>
            <input id="notes" name="notes" defaultValue={record.notes ?? ""} className={field} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary">Save changes</button>
          <Link href={`/admin/salary/${record.id}`} className="btn-outline">Cancel</Link>
        </div>
      </form>
    </>
  );
}
