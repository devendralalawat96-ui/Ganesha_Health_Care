/**
 * `real*` entries are the business's own photos (via their Drive folder).
 * The rest are Unsplash stock standing in until real equivalents arrive.
 */
export const img = {
  realTeam: "/img/real-team.jpg",
  realStaffPoster: "/img/real-staff-poster.jpg",
  realTraining: "/img/real-training.jpg",
  realOffice: "/img/real-office.jpg",
  realOffice2: "/img/real-office2.jpg",
  realCaregiverClient: "/img/real-caregiver-client.jpg",
  founderDevendra: "/img/founder-devendra.jpg",
  patientCaregiver1: "/img/patient-caregiver-1.jpg",
  patientCaregiver2: "/img/patient-caregiver-2.jpg",
  patientCaregiver3: "/img/patient-caregiver-3.jpg",
  trainingClassroom1: "/img/training-classroom-1.jpg",
  trainingClassroom2: "/img/training-classroom-2.jpg",

  hero: "/img/hero-care.jpg",
  elderly: "/img/elderly-care.jpg",
  nurse: "/img/nurse-home.jpg",
  hands: "/img/senior-hands.jpg",
  physio: "/img/physio.jpg",
  motherBaby: "/img/mother-baby.jpg",
  equipment: "/img/equipment.jpg",
  icu: "/img/icu.jpg",
  institute: "/img/institute.jpg",
  team: "/img/about-team.jpg",

  // Per-service photos, one topic each — reduces the heavy image reuse across
  // the 21 service pages.
  svcBedridden: "/img/svc-bedridden.jpg",
  svcDementia: "/img/svc-dementia.jpg",
  svcMotherBaby: "/img/svc-mother-baby.jpg",
  svcPhysio: "/img/svc-physio.jpg",
  svcPostSurgery: "/img/svc-post-surgery.jpg",
  svcStroke: "/img/svc-stroke.jpg",

  // Dedicated per-service photos, one subject each.
  gptNewbornCare: "/img/gpt-newborn-care.jpg",
  gptChildCare: "/img/gpt-child-care.jpg",
  gptDisabledCare: "/img/gpt-disabled-care.jpg",
  gptDomesticHelp: "/img/gpt-domestic-help.jpg",
  gptHomeNursingCare: "/img/gpt-home-nursing-care.jpg",
  gptElderlyCare: "/img/gpt-elderly-care.jpg",
  gptCompanionCare: "/img/gpt-companion-care.jpg",
  gptBedriddenPatientCare: "/img/gpt-bedridden-patient-care.jpg",
  gptDementiaCare: "/img/gpt-dementia-care.jpg",
  gptParkinsonsCare: "/img/gpt-parkinsons-care.jpg",
  gptPatientAttendant: "/img/gpt-patient-attendant.jpg",
  gptIcuSetup: "/img/gpt-icu-setup-at-home.jpg",
  gptPhysiotherapy: "/img/gpt-physiotherapy.jpg",
  gptMotherBabyCare: "/img/gpt-mother-baby-care.jpg",
  gptPostSurgeryCare: "/img/gpt-post-surgery-care.jpg",
};

const byService: Record<string, string> = {
  "baby-sitting-at-home": img.gptChildCare,
  "stroke-paralysis-care": img.svcStroke,
  "newborn-care": img.gptNewbornCare,
  "child-care": img.gptChildCare,
  "disabled-care": img.gptDisabledCare,
  "domestic-help": img.gptDomesticHelp,
  "home-nursing-care": img.gptHomeNursingCare,
  "elderly-care": img.gptElderlyCare,
  "companion-care": img.gptCompanionCare,
  "bedridden-patient-care": img.gptBedriddenPatientCare,
  "dementia-care": img.gptDementiaCare,
  "parkinsons-care": img.gptParkinsonsCare,
  "patient-attendant": img.gptPatientAttendant,
  "icu-setup-at-home": img.gptIcuSetup,
  physiotherapy: img.gptPhysiotherapy,
  "mother-and-baby-care": img.gptMotherBabyCare,
  "post-surgery-care": img.gptPostSurgeryCare,
  "tracheostomy-care": img.icu,
  "ventilator-care": img.icu,
  "palliative-care": img.hands,
  "medical-equipment-rental": img.equipment,
};

export function serviceImage(slug: string): string {
  return byService[slug] ?? img.nurse;
}
