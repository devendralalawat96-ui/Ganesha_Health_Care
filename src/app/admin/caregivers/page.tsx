import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toggleCaregiverActive } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCaregiversPage() {
  await requireAdmin();

  const caregivers = await prisma.caregiver.findMany({ orderBy: [{ active: "desc" }, { name: "asc" }] });

  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl">Caregivers</h1>
        <Link href="/admin/caregivers/new" className="btn-primary !py-2">Add caregiver</Link>
      </div>
      <p className="mt-2 text-[13.5px] text-inksoft">
        Active caregivers appear as profile cards on the public{" "}
        <Link href="/caregivers" className="font-medium text-brand hover:underline">Our Caregivers</Link> page.
      </p>

      {caregivers.length === 0 ? (
        <div className="card mt-6 border-dashed">
          <p className="text-[14px] text-inksoft">No caregivers added yet.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-[12px] uppercase tracking-wider text-sage">
                <th className="py-3 pr-4 font-semibold">Name</th>
                <th className="py-3 pr-4 font-semibold">Role</th>
                <th className="py-3 pr-4 font-semibold">Experience</th>
                <th className="py-3 pr-4 font-semibold">Languages</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {caregivers.map((c) => (
                <tr key={c.id} className="border-b border-line/60">
                  <td className="py-3.5 pr-4 text-[13.5px] font-medium">{c.name}</td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">{c.role}</td>
                  <td className="py-3.5 pr-4 text-[13.5px] text-inksoft">{c.experience} yrs</td>
                  <td className="py-3.5 pr-4 text-[13px] text-inksoft">{c.languages}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        c.active ? "bg-brand-soft text-brand-dark" : "bg-line text-sage"
                      }`}
                    >
                      {c.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <form action={toggleCaregiverActive}>
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="active" value={String(c.active)} />
                      <button type="submit" className="text-[13px] font-medium text-brand hover:underline">
                        {c.active ? "Hide" : "Show"}
                      </button>
                    </form>
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
