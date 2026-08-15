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
};

const byService: Record<string, string> = {
  "baby-sitting-at-home": img.motherBaby,
  "stroke-paralysis-care": img.svcStroke,
  "newborn-care": img.motherBaby,
  "child-care": img.motherBaby,
  "disabled-care": img.hands,
  "domestic-help": img.team,
  "home-nursing-care": img.nurse,
  "elderly-care": img.elderly,
  "companion-care": img.hands,
  "bedridden-patient-care": img.svcBedridden,
  "dementia-care": img.svcDementia,
  "parkinsons-care": img.physio,
  "patient-attendant": img.nurse,
  "icu-setup-at-home": img.icu,
  physiotherapy: img.svcPhysio,
  "mother-and-baby-care": img.svcMotherBaby,
  "post-surgery-care": img.svcPostSurgery,
  "tracheostomy-care": img.icu,
  "ventilator-care": img.icu,
  "palliative-care": img.hands,
  "medical-equipment-rental": img.equipment,
};

export function serviceImage(slug: string): string {
  return byService[slug] ?? img.nurse;
}
