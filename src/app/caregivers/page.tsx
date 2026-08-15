import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Caregivers",
  description: `Meet the trained, police-verified nurses and caretakers who provide home care across ${site.city}.`,
};

export const dynamic = "force-dynamic";

export default async function CaregiversPage() {
  let caregivers: Awaited<ReturnType<typeof prisma.caregiver.findMany>> = [];
  let dbReady = true;

  try {
    caregivers = await prisma.caregiver.findMany({
      where: { active: true },
      orderBy: [{ experience: "desc" }, { name: "asc" }],
    });
  } catch {
    dbReady = false;
  }

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl">Our Caregivers</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        Every caregiver below is police-verified and trained for the duties they take on. Tell us
        about the patient and we will match the right person.
      </p>

      {caregivers.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caregivers.map((c) => (
            <article key={c.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">{c.name}</h2>
                  <p className="text-[13px] text-brand">{c.role}</p>
                </div>
                {c.verified && (
                  <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
                    Verified
                  </span>
                )}
              </div>

              <dl className="mt-4 space-y-2 text-[13px]">
                <div className="flex gap-2">
                  <dt className="text-sage">Qualifications</dt>
                  <dd className="text-inksoft">{c.qualifications}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-sage">Experience</dt>
                  <dd className="text-inksoft">{c.experience} years</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-sage">Languages</dt>
                  <dd className="text-inksoft">{c.languages}</dd>
                </div>
              </dl>

              {c.bio && <p className="mt-4 text-[13px] leading-relaxed text-inksoft">{c.bio}</p>}

              <a
                href={waHref(`Hi, I would like to know more about ${c.name} (${c.role}).`)}
                className="btn-outline mt-5 w-full !py-2 !text-[13px]"
              >
                Ask about {c.name.split(" ")[0]}
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="card mt-10 border-dashed">
          <p className="font-serif text-lg">
            {dbReady ? "No caregiver profiles added yet" : "Caregiver profiles not available"}
          </p>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-inksoft">
            {dbReady
              ? "Add caregivers from the admin panel and their profile cards will appear here."
              : "The database is not connected yet. Set DATABASE_URL and run the migration to enable caregiver profiles."}
          </p>
          <a href={telHref()} className="btn-primary mt-5">
            Call {site.phoneDisplay}
          </a>
        </div>
      )}
    </div>
  );
}
