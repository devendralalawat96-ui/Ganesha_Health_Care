export type Landing = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  points: string[];
  relatedService: string;
};

export const landingPages: Landing[] = [
  {
    slug: "home-nursing-services-in-indore",
    h1: "Home Nursing Services in Indore",
    title: "Home Nursing Services in Indore",
    description:
      "Trained, police-verified nurses for home duty in Indore. IV drips, injections, wound dressing and monitoring. Available 24×7.",
    intro:
      "Qualified nurses who come to your home in Indore to handle the clinical care a hospital would normally provide — so recovery happens in familiar surroundings, with the family close by.",
    points: [
      "Injections, IV drips and wound dressing at home",
      "Blood pressure, sugar and vitals monitoring with charting",
      "Catheter care, Ryles tube feeding and post-operative care",
      "Day, night and 24-hour shifts available",
      "Police-verified nurses matched to the patient's condition",
    ],
    relatedService: "home-nursing-care",
  },
  {
    slug: "elderly-care-at-home-indore",
    h1: "Elderly Care at Home in Indore",
    title: "Elderly Care at Home in Indore",
    description:
      "Respectful daily-living support for seniors at home in Indore — bathing, feeding, mobility and medication reminders. 24×7 caregivers.",
    intro:
      "Patient, respectful support for older adults in Indore who are managing at home but need a steady hand through the day — or company through the night.",
    points: [
      "Bathing, grooming and personal hygiene assistance",
      "Meal preparation and assisted feeding",
      "Mobility support and fall prevention around the house",
      "Medication reminders kept strictly on schedule",
      "Male and female caregivers as your family prefers",
    ],
    relatedService: "elderly-care",
  },
  {
    slug: "icu-care-at-home-indore",
    h1: "ICU Care at Home in Indore",
    title: "ICU Care at Home in Indore",
    description:
      "Full ICU setup at home in Indore — monitor, oxygen, ventilator support and critical-care trained nurses on 24×7 rotation.",
    intro:
      "For long-term critical patients, we bring ICU-level equipment and trained critical-care nurses into your home in Indore — usually at considerably lower cost than an extended hospital ICU stay.",
    points: [
      "Multipara monitor, oxygen supply and suction apparatus",
      "Hospital bed and ventilator support where prescribed",
      "Critical-care trained nurses on 24-hour rotation",
      "Setup coordinated with your treating intensivist",
      "Clear emergency escalation plan agreed in advance",
    ],
    relatedService: "icu-setup-at-home",
  },
  {
    slug: "patient-care-services-indore",
    h1: "Patient Care Services in Indore",
    title: "Patient Care Services in Indore",
    description:
      "Patient attendants and caretakers for home and hospital duty in Indore. Verified staff, day and night shifts, 24×7 availability.",
    intro:
      "Reliable attendants for patients at home or in hospital across Indore — practical, hands-on support for families who cannot be present around the clock.",
    points: [
      "Hospital bedside attendance, including overnight duty",
      "Help with washroom, walking and safe transfers",
      "Feeding, hydration and general comfort care",
      "Fetching medicines, reports and coordinating with staff",
      "Same-day placement for urgent requirements",
    ],
    relatedService: "patient-attendant",
  },
  {
    slug: "bedridden-patient-care-indore",
    h1: "Bedridden Patient Care in Indore",
    title: "Bedridden Patient Care in Indore",
    description:
      "Round-the-clock care for bedridden patients in Indore — repositioning, bed sore prevention, hygiene and assisted feeding.",
    intro:
      "Fully dependent patients need constant, skilled attention. Our caregivers in Indore focus on preventing the complications that bedridden patients are most at risk from.",
    points: [
      "Two-hourly repositioning to prevent bed sores",
      "Sponge bathing, diaper changes and full personal hygiene",
      "Assisted or tube feeding as required",
      "Passive limb exercises to prevent contractures",
      "Daily skin inspection with changes reported to the family",
    ],
    relatedService: "bedridden-patient-care",
  },
  {
    slug: "home-care-nurse-near-me-indore",
    h1: "Home Care Nurse Near Me — Indore",
    title: "Home Care Nurse Near Me in Indore",
    description:
      "Looking for a home care nurse near you in Indore? Verified nurses available across the city, 24×7. Call 079747 36011.",
    intro:
      "We place trained nurses across all of Indore, from Bajrang Nagar and Vijay Nagar to Rau and Bhawarkuan. Tell us where you are and we will send someone close by.",
    points: [
      "Caregivers available across every locality in Indore",
      "Same-day placement for urgent and discharge cases",
      "Police-verified, background-checked nursing staff",
      "Day, night and 24-hour shift options",
      "Replacement guarantee if the caregiver is not the right fit",
    ],
    relatedService: "home-nursing-care",
  },
  {
    slug: "caretaker-services-indore",
    h1: "Caretaker Services in Indore",
    title: "Caretaker Services in Indore",
    description:
      "Trained caretakers for elderly, bedridden and recovering patients at home in Indore. Verified staff, flexible shifts.",
    intro:
      "Dependable caretakers for families in Indore who need daily help — whether that is a few hours of support or a full-time live-in arrangement.",
    points: [
      "Daily-living support: bathing, feeding, mobility, hygiene",
      "Companionship and supervision for patients not safe alone",
      "Flexible shifts from 12 hours to full-time cover",
      "Male and female caretakers available",
      "Clear rates quoted before the duty begins",
    ],
    relatedService: "companion-care",
  },
  {
    slug: "dementia-care-indore",
    h1: "Dementia Care in Indore",
    title: "Dementia Care at Home in Indore",
    description:
      "Specialised dementia and Alzheimer's caregivers at home in Indore — routine, safety supervision and calm, trained handling.",
    intro:
      "Dementia care needs patience and specific training. Our caregivers in Indore are prepared for confusion, agitation and wandering, and know how to respond without escalating distress.",
    points: [
      "Consistent daily routine to reduce confusion",
      "Safety supervision against wandering, especially after dark",
      "Calm redirection during agitation and sundowning",
      "Memory and orientation activities through the day",
      "Guidance for the family on what to expect next",
    ],
    relatedService: "dementia-care",
  },
  {
    slug: "physiotherapy-at-home-indore",
    h1: "Physiotherapy at Home in Indore",
    title: "Physiotherapy at Home in Indore",
    description:
      "Qualified physiotherapists visiting your home in Indore for post-surgery rehab, stroke recovery and joint pain management.",
    intro:
      "A physiotherapist comes to your home in Indore, so recovery sessions happen consistently without the strain of travelling to a clinic after surgery or a stroke.",
    points: [
      "Post-operative rehabilitation programmes",
      "Stroke and paralysis physiotherapy",
      "Joint pain, arthritis and mobility management",
      "Gait training and balance work to prevent falls",
      "A home exercise plan the family can continue between visits",
    ],
    relatedService: "physiotherapy",
  },
  {
    slug: "medical-equipment-on-rent-indore",
    h1: "Medical Equipment on Rent in Indore",
    title: "Medical Equipment on Rent in Indore",
    description:
      "Rent hospital beds, oxygen concentrators, wheelchairs, BiPAP and CPAP machines in Indore. Delivery, installation and pickup included.",
    intro:
      "Setting up care at home usually means equipment you only need for a few weeks or months. Rent it in Indore instead of buying — we deliver, install and collect.",
    points: [
      "Oxygen concentrators and cylinders",
      "Hospital beds with side rails and adjustable height",
      "Wheelchairs, walkers and commodes",
      "BiPAP and CPAP machines",
      "Alternating-pressure air mattresses for bed sore prevention",
      "Delivery, installation and collection included",
    ],
    relatedService: "medical-equipment-rental",
  },
];

export function getLanding(slug: string): Landing | undefined {
  return landingPages.find((l) => l.slug === slug);
}
