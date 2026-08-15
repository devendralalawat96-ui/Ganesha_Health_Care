import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inr, monthName } from "@/lib/format";
import { recordSalary, toggleSalaryPaid } from "./actions";

export const dynamic = "force-dynamic";

export default async function SalaryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { error } = await searchParams;

  const now = new Date();
  const [caregivers, records] = await Promise.all([
    prisma.caregiver.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.salaryRecord.findMany({
      orderBy: [{ year: "desc" }, { month: "desc" }],
      include: { caregiver: { select: { name: true, role: true } } },
      take: 100,
    }),
  ]);

  const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand";
  const totalUnpaid = records.filter((r) => !r.paid).reduce((sum, r) => sum + r.netAmount, 0);

  return (
    <>
      <h1 className="mt-8 text-2xl">Salary</h1>
      <p className="mt-2 text-[13.5px] text-inksoft">
        Record monthly pay per caregiver. Recording the same caregiver and month again updates the
        existing entry rather than creating a duplicate.
      </p>

      {error && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          {error === "negative"
            ? "Deductions cannot exceed base pay plus bonus."
            : "Please check the form — some fields were missing or invalid."}
        </p>
      )}

      {caregivers.length === 0 ? (
        <div className="card mt-6 border-dashed">
          <p className="text-[14px] text-inksoft">
            Add a caregiver first —{" "}
            <Link href="/admin/caregivers/new?from=salary" className="font-medium text-brand hover:underline">
              add one here
            </Link>
            .
          </p>
        </div>
      ) : (
        <form action={recordSalary} className="card mt-6 max-w-3xl space-y-5">
          <p className="font-serif text-base">Record salary</p>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="caregiverId" className="text-[13px] font-semibold">Caregiver</label>
                <Link
                  href="/admin/caregivers/new?from=salary"
                  className="text-[12.5px] font-medium text-brand hover:underline"
                >
                  + Add attendant / caregiver
                </Link>
              </div>
              <select id="caregiverId" name="caregiverId" required defaultValue="" className={field}>
                <option value="" disabled>Select a caregiver</option>
                {caregivers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} — {c.role}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="month" className="text-[13px] font-semibold">Month</label>
              <select id="month" name="month" required defaultValue={now.getMonth() + 1} className={field}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{monthName(m)}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="text-[13px] font-semibold">Year</label>
              <input id="year" name="year" type="number" required defaultValue={now.getFullYear()} className={field} />
            </div>
            <div>
              <label htmlFor="baseAmount" className="text-[13px] font-semibold">Base pay (₹)</label>
              <input id="baseAmount" name="baseAmount" type="number" min={0} step={1} required className={field} />
            </div>
            <div>
              <label htmlFor="bonus" className="text-[13px] font-semibold">Bonus (₹)</label>
              <input id="bonus" name="bonus" type="number" min={0} step={1} defaultValue={0} className={field} />
            </div>
            <div>
              <label htmlFor="deductions" className="text-[13px] font-semibold">Deductions (₹)</label>
              <input id="deductions" name="deductions" type="number" min={0} step={1} defaultValue={0} className={field} />
            </div>
            <div>
              <label htmlFor="notes" className="text-[13px] font-semibold">
                Notes <span className="font-normal text-sage">(optional)</span>
              </label>
              <input id="notes" name="notes" className={field} />
            </div>
          </div>

          <button type="submit" className="btn-primary">Save salary record</button>
        </form>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        <h2 className="text-xl">Salary records</h2>
        {totalUnpaid > 0 && (
          <p className="text-[13.5px] text-inksoft">
            Unpaid total: <span className="font-semibold text-brand">{inr(totalUnpaid)}</span>
          </p>
        )}
      </div>

      {records.length === 0 ? (
        <div className="card mt-4 border-dashed">
          <p className="text-[14px] text-inksoft">No salary records yet.</p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-[12px] uppercase tracking-wider text-sage">
                <th className="py-3 pr-4 font-semibold">Caregiver</th>
                <th className="py-3 pr-4 font-semibold">Period</th>
                <th className="py-3 pr-4 font-semibold">Base</th>
                <th className="py-3 pr-4 font-semibold">Bonus</th>
                <th className="py-3 pr-4 font-semibold">Deductions</th>
                <th className="py-3 pr-4 font-semibold">Net</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-line/60">
                  <td className="py-3.5 pr-4 text-[13.5px]">
                    <span className="font-medium">{r.caregiver.name}</span>
                    <span className="block text-[12px] text-sage">{r.caregiver.role}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-[13px] text-inksoft">
                    {monthName(r.month)} {r.year}
                  </td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">{inr(r.baseAmount)}</td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">{inr(r.bonus)}</td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">{inr(r.deductions)}</td>
                  <td className="py-3.5 pr-4 text-[13.5px] font-medium">{inr(r.netAmount)}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        r.paid ? "bg-brand-soft text-brand-dark" : "bg-alert/10 text-alert"
                      }`}
                    >
                      {r.paid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/salary/${r.id}`}
                        className="text-[13px] font-medium text-brand hover:underline"
                      >
                        View slip
                      </Link>
                      <form action={toggleSalaryPaid}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" className="text-[13px] font-medium text-inksoft hover:text-brand hover:underline">
                          {r.paid ? "Mark unpaid" : "Mark paid"}
                        </button>
                      </form>
                    </div>
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
