import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createCaregiver } from "../actions";

export default async function NewCaregiverPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  await requireAdmin();
  const { error, from } = await searchParams;

  const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand";

  return (
    <>
      <div className="mt-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl">Add caregiver</h1>
        <Link
          href={from === "salary" ? "/admin/salary" : "/admin/caregivers"}
          className="text-[13.5px] font-medium text-inksoft hover:text-brand"
        >
          ← Back
        </Link>
      </div>

      {error && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          Please check the form — some fields were missing or invalid.
        </p>
      )}

      <form action={createCaregiver} className="mt-6 max-w-2xl space-y-5">
        {from === "salary" && <input type="hidden" name="returnTo" value="salary" />}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-[13px] font-semibold">Name</label>
            <input id="name" name="name" required className={field} />
          </div>
          <div>
            <label htmlFor="role" className="text-[13px] font-semibold">Role</label>
            <select id="role" name="role" required defaultValue="" className={field}>
              <option value="" disabled>Select a role</option>
              {["Nurse", "Caregiver", "Patient Attendant", "Physiotherapist", "Critical Care Nurse"].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="phone" className="text-[13px] font-semibold">
              Phone <span className="font-normal text-sage">(for salary slips)</span>
            </label>
            <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="10-digit mobile" className={field} />
          </div>
          <div>
            <label htmlFor="idType" className="text-[13px] font-semibold">
              Govt. ID <span className="font-normal text-sage">(optional)</span>
            </label>
            <select id="idType" name="idType" defaultValue="" className={field}>
              <option value="">Select</option>
              {["Aadhaar", "Voter ID", "PAN", "Driving Licence", "Passport"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="idNumber" className="text-[13px] font-semibold">
              ID number <span className="font-normal text-sage">(optional)</span>
            </label>
            <input id="idNumber" name="idNumber" placeholder="As on the document" className={field} />
          </div>
        </div>

        <div>
          <label htmlFor="qualifications" className="text-[13px] font-semibold">Qualifications</label>
          <input id="qualifications" name="qualifications" required placeholder="GNM, CPR certified" className={field} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="experience" className="text-[13px] font-semibold">Experience (years)</label>
            <input id="experience" name="experience" type="number" min={0} step={1} required className={field} />
          </div>
          <div>
            <label htmlFor="languages" className="text-[13px] font-semibold">Languages</label>
            <input id="languages" name="languages" required placeholder="Hindi, English" className={field} />
          </div>
          <div>
            <label htmlFor="gender" className="text-[13px] font-semibold">Gender</label>
            <select id="gender" name="gender" required defaultValue="" className={field}>
              <option value="" disabled>Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="text-[13px] font-semibold">
            Short bio <span className="font-normal text-sage">(optional, shown publicly)</span>
          </label>
          <textarea id="bio" name="bio" rows={3} className={field} />
        </div>

        <button type="submit" className="btn-primary">Add caregiver</button>
      </form>
    </>
  );
}
