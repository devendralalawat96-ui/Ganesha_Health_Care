import type { Metadata } from "next";
import Image from "next/image";
import { site, telHref, waHref } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Nursing Institute",
  description: `Caregiver, ANM, GNM, CPR and First Aid training in ${site.city} with internship and placement assistance.`,
};

const courses = [
  { name: "Caregiver / Patient Attendant", duration: "3 months", eligibility: "10th pass", fee: "On request" },
  { name: "ANM (Auxiliary Nurse Midwifery)", duration: "2 years", eligibility: "12th pass", fee: "On request" },
  { name: "GNM (General Nursing & Midwifery)", duration: "3 years", eligibility: "12th pass (Science preferred)", fee: "On request" },
  { name: "CPR & Basic Life Support", duration: "2 days", eligibility: "Open to all", fee: "On request" },
  { name: "First Aid Certification", duration: "1 week", eligibility: "Open to all", fee: "On request" },
];

export default function InstitutePage() {
  return (
    <div className="container-page py-14">
      <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl">
        <Image
          src={img.realTraining}
          alt="A caregiver training session in progress"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
      </div>

      <h1 className="text-3xl">Ganesha Nursing Institute</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-inksoft">
        We train the caregivers we place. Courses run from short certifications to full nursing
        programmes, with internship on real home-care duty and placement assistance afterwards.
      </p>

      <h2 className="mt-12 text-xl">Courses we offer</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line text-[12px] uppercase tracking-wider text-sage">
              <th className="py-3 pr-4 font-semibold">Course</th>
              <th className="py-3 pr-4 font-semibold">Duration</th>
              <th className="py-3 pr-4 font-semibold">Eligibility</th>
              <th className="py-3 font-semibold">Fees</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.name} className="border-b border-line/60">
                <td className="py-3.5 pr-4 text-[14px] font-medium">{c.name}</td>
                <td className="py-3.5 pr-4 text-[14px] text-inksoft">{c.duration}</td>
                <td className="py-3.5 pr-4 text-[14px] text-inksoft">{c.eligibility}</td>
                <td className="py-3.5 text-[14px] text-inksoft">{c.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12.5px] text-sage">
        Course fees are shared on request — call us for the current fee structure and batch dates.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl">Internship &amp; placement</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-inksoft">
            Students train on live home-care duty alongside our experienced nurses, not only in a
            classroom. On completion we assist with placement — many of our own caregivers are
            graduates of this institute.
          </p>
        </div>
        <div>
          <h2 className="text-xl">Who should apply</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-inksoft">
            Anyone looking to enter home health care as a profession — school leavers, people
            changing careers, and family members who want formal training before caring for a
            relative at home.
          </p>
        </div>
      </div>

      <div className="mt-12 card bg-brand-soft/40">
        <h2 className="font-serif text-xl">Apply for admission</h2>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-inksoft">
          Call or WhatsApp us for the current batch dates, fee structure and prospectus. We will
          walk you through eligibility and what the course involves.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={telHref()} className="btn-primary">Call {site.phoneDisplay}</a>
          <a href={waHref("Hi, I would like details about your nursing courses and admission.")} className="btn-outline">
            Ask about admission
          </a>
        </div>
      </div>
    </div>
  );
}
