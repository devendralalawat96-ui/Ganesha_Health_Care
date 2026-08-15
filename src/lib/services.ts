export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  includes: string[];
  goodFor: string;
};

export const services: Service[] = [
  {
    slug: "newborn-care",
    name: "Newborn Care",
    short: "Trained help for feeding, bathing, sleep routine and night duty with a newborn.",
    intro:
      "The first months with a newborn are exhausting, especially after a difficult delivery. A trained attendant helps with the baby's daily routine so the mother can rest and recover properly.",
    includes: [
      "Bathing, changing and daily hygiene for the baby",
      "Support with feeding and burping",
      "Help settling the baby into a sleep routine",
      "Night duty so parents can sleep",
      "Sterilising bottles and keeping the baby's things clean",
      "Watching for feeding or breathing problems and alerting you",
    ],
    goodFor: "New parents who need trained help in the first weeks and months at home.",
  },
  {
    slug: "child-care",
    name: "Child Care & Aaya Services",
    short: "Experienced aaya for daily child care at home — meals, hygiene and supervision.",
    intro:
      "An experienced aaya looks after your child at home while you are at work or managing other responsibilities — with the same person each day, so the child settles into a routine.",
    includes: [
      "Supervision through the day at your home",
      "Meals, feeding and snack routine",
      "Bathing, changing and daily hygiene",
      "Help with nap and bedtime routine",
      "Play and simple activities through the day",
      "Escorting to school or nearby classes if needed",
    ],
    goodFor: "Working parents who want consistent, trained child care at home.",
  },
  {
    slug: "disabled-care",
    name: "Disabled Care",
    short: "Daily support for people with physical or mobility disabilities, at home.",
    intro:
      "Long-term support for someone living with a physical or mobility disability — practical help with daily tasks, provided in a way that keeps as much independence as possible.",
    includes: [
      "Help with bathing, dressing and personal hygiene",
      "Transfers between bed, chair and wheelchair",
      "Mobility support around the house",
      "Meal preparation and assistance with eating",
      "Medication reminders and appointment support",
      "Company and daily routine support",
    ],
    goodFor: "Families supporting a member with a long-term physical disability at home.",
  },
  {
    slug: "domestic-help",
    name: "Domestic Help & Cook",
    short: "Maids, cooks and household help — often alongside a caregiver placement.",
    intro:
      "Household help placed through the same verification process as our caregivers. Families caring for a patient at home often need cooking and cleaning covered too, so it is one less thing to arrange separately.",
    includes: [
      "Full-time or part-time maid placement",
      "Cook for daily meals, including patient diets",
      "General cleaning and household upkeep",
      "Laundry and kitchen work",
      "Police-verified staff, same as our caregivers",
      "Replacement if the placement is not a good fit",
    ],
    goodFor: "Households that need cooking and cleaning covered alongside patient care.",
  },
  {
    slug: "home-nursing-care",
    name: "Home Nursing Care",
    short: "Injections, IV drips, dressing, BP & sugar monitoring, catheter care.",
    intro:
      "Trained nurses come to your home to handle the clinical tasks a hospital would normally do — so your family member recovers in familiar surroundings instead of a ward.",
    includes: [
      "Injections and IV drip administration",
      "Wound dressing and post-operative care",
      "Blood pressure and blood sugar monitoring",
      "Catheter care and Ryles tube feeding",
      "Medication management and reminders",
      "Vital signs charting shared with your doctor",
    ],
    goodFor: "Patients discharged from hospital who still need daily clinical care.",
  },
  {
    slug: "elderly-care",
    name: "Elderly Care",
    short: "Daily-living support for seniors — bathing, feeding, mobility, medicines.",
    intro:
      "Respectful, patient day-to-day support for older adults who are managing well at home but need a steady hand with daily routines.",
    includes: [
      "Bathing, grooming and personal hygiene",
      "Meal preparation and assisted feeding",
      "Mobility support and fall prevention",
      "Medication reminders on schedule",
      "Light companionship and conversation",
      "Escort for doctor visits and walks",
    ],
    goodFor: "Seniors living alone or with working families.",
  },
  {
    slug: "companion-care",
    name: "Companion Care",
    short: "Supervision and company for someone who shouldn't be left alone.",
    intro:
      "Non-medical company and supervision — for families who mainly need someone reliable present through the day or night.",
    includes: [
      "Continuous presence and supervision",
      "Conversation and emotional support",
      "Help with reading, walking and hobbies",
      "Reminders for meals and medicines",
      "Alerting family in case of any change",
    ],
    goodFor: "Patients at risk of falls or wandering, or seniors who feel isolated.",
  },
  {
    slug: "bedridden-patient-care",
    name: "Bedridden Patient Care",
    short: "Full-time care for patients who cannot get out of bed.",
    intro:
      "Round-the-clock attention for fully dependent patients, with a strong focus on preventing bed sores and infections.",
    includes: [
      "Two-hourly repositioning to prevent bed sores",
      "Sponge bathing and full personal hygiene",
      "Diaper changes and toileting support",
      "Assisted or tube feeding",
      "Passive limb exercises",
      "Skin inspection and pressure-area care",
    ],
    goodFor: "Paralysis, advanced age, or long-term immobility after surgery.",
  },
  {
    slug: "dementia-care",
    name: "Dementia & Alzheimer's Care",
    short: "Specialised caregiving for Alzheimer's and memory-loss patients.",
    intro:
      "Caregivers trained to work with memory loss — keeping routines steady, the home safe, and responses calm when the patient is confused or agitated.",
    includes: [
      "Consistent daily routine to reduce confusion",
      "Safety supervision against wandering",
      "Calm redirection during agitation",
      "Memory and orientation activities",
      "Help with all personal care needs",
      "Guidance for family on what to expect",
    ],
    goodFor: "Alzheimer's and other forms of dementia at any stage.",
  },
  {
    slug: "parkinsons-care",
    name: "Parkinson's Care",
    short: "Care tailored to tremor and mobility challenges.",
    intro:
      "Support built around the specific difficulties Parkinson's brings — unsteady movement, tremors, and strict medication timing.",
    includes: [
      "Mobility and transfer assistance",
      "Fall-risk management around the house",
      "Strictly timed medication reminders",
      "Help with eating, dressing and writing",
      "Prescribed exercise support",
    ],
    goodFor: "Parkinson's patients living at home at any stage.",
  },
  {
    slug: "patient-attendant",
    name: "Patient Attendant",
    short: "A general attendant for hospital or home duty.",
    intro:
      "An attendant who assists with everyday needs and stays with the patient — practical support without clinical procedures.",
    includes: [
      "Hospital bedside attendance",
      "Help with washroom and walking",
      "Feeding and hydration support",
      "Fetching medicines and reports",
      "Overnight duty available",
    ],
    goodFor: "Families who cannot stay at the hospital or need day-shift relief.",
  },
  {
    slug: "icu-setup-at-home",
    name: "ICU Setup at Home",
    short: "ICU-level equipment and monitoring in your own home.",
    intro:
      "For patients who need intensive monitoring but would do better at home, we set up the equipment and staff it with trained critical-care nurses.",
    includes: [
      "Multipara monitor, oxygen and suction setup",
      "Hospital bed and required accessories",
      "Critical-care trained nurses on rotation",
      "Ventilator support where prescribed",
      "Coordination with your treating doctor",
      "Emergency escalation protocol",
    ],
    goodFor: "Long-term critical patients where hospital ICU stay is impractical.",
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy at Home",
    short: "In-home physical therapy for recovery and mobility.",
    intro:
      "A qualified physiotherapist visits your home so recovery sessions happen without the strain of travelling to a clinic.",
    includes: [
      "Post-operative rehabilitation",
      "Stroke and paralysis physiotherapy",
      "Joint pain and arthritis management",
      "Gait training and balance work",
      "Home exercise plan for the family",
    ],
    goodFor: "Post-surgery recovery, stroke rehabilitation, chronic joint pain.",
  },
  {
    slug: "mother-and-baby-care",
    name: "Mother & Baby Care",
    short: "Postpartum care for new mothers and newborns.",
    intro:
      "Experienced caregivers who look after both mother and newborn in the first weeks — the period when rest matters most.",
    includes: [
      "Newborn bathing, feeding and sleep routine",
      "Post-delivery care for the mother",
      "Breastfeeding support and guidance",
      "Massage for mother and baby",
      "Night duty so the mother can rest",
    ],
    goodFor: "New mothers after normal delivery or C-section.",
  },
  {
    slug: "post-surgery-care",
    name: "Post Surgery Care",
    short: "Recovery support right after hospital discharge.",
    intro:
      "The first weeks after surgery decide how well recovery goes. We handle wound care, mobility and medication so nothing is missed at home.",
    includes: [
      "Surgical wound dressing",
      "Pain and medication management",
      "Assisted walking and safe movement",
      "Diet support as advised by the surgeon",
      "Watching for infection or complications",
    ],
    goodFor: "Any patient discharged after an operation.",
  },
  {
    slug: "tracheostomy-care",
    name: "Tracheostomy Care",
    short: "Specialised care for patients with a tracheostomy tube.",
    intro:
      "Tracheostomy patients need trained hands. Our nurses manage suction, hygiene and tube care to keep the airway clear and infection-free.",
    includes: [
      "Regular suctioning of secretions",
      "Stoma cleaning and dressing",
      "Tube change support with your doctor",
      "Humidification and oxygen management",
      "Infection watch and escalation",
    ],
    goodFor: "Patients discharged home with a tracheostomy in place.",
  },
  {
    slug: "ventilator-care",
    name: "Ventilator Care at Home",
    short: "Home care for patients on ventilator support.",
    intro:
      "Home ventilator care handled by nurses trained on the equipment, with clear escalation if readings move outside the safe range.",
    includes: [
      "Ventilator monitoring and settings check",
      "Airway suction and hygiene",
      "Oxygen saturation monitoring",
      "Chest physiotherapy support",
      "24×7 nurse rotation",
    ],
    goodFor: "Long-term ventilator-dependent patients at home.",
  },
  {
    slug: "baby-sitting-at-home",
    name: "Baby Sitting at Home",
    short: "Reliable babysitters for a few hours or full days.",
    intro:
      "A trusted sitter at your home so you can go to work, attend an appointment or travel — with someone who keeps to your child's own routine.",
    includes: [
      "Supervision and safe play at home",
      "Feeding and nap routine as you set it",
      "Nappy changing and bathing for infants",
      "School pick-up and drop assistance",
      "Homework and activity support for older children",
      "Hourly, half-day or full-day arrangements",
    ],
    goodFor: "Working parents, single parents, and families without local support.",
  },
  {
    slug: "stroke-paralysis-care",
    name: "Stroke & Paralysis Care",
    short: "Daily care and mobility support after a stroke.",
    intro:
      "Attendants trained to care for patients with partial or full paralysis — safe transfers, positioning, and the daily routine that recovery depends on.",
    includes: [
      "Safe lifting, turning and transfers",
      "Position changes to prevent bed sores",
      "Assistance with feeding and swallowing care",
      "Support with prescribed physiotherapy exercises",
      "Bathing, toileting and personal hygiene",
      "Help with speech and communication needs",
    ],
    goodFor: "Patients recovering from a stroke, or living with hemiplegia or paraplegia.",
  },
  {
    slug: "palliative-care",
    name: "Palliative Care",
    short: "Comfort-focused care during serious illness.",
    intro:
      "When treatment shifts from curing to comfort, our focus is dignity, pain relief, and supporting the family through it.",
    includes: [
      "Pain and symptom management",
      "Full personal hygiene and comfort care",
      "Emotional support for patient and family",
      "Coordination with the palliative physician",
      "Round-the-clock attendance if needed",
    ],
    goodFor: "Advanced cancer and other terminal or end-stage illness.",
  },
  {
    slug: "medical-equipment-rental",
    name: "Medical Equipment on Rent",
    short: "Oxygen cylinders, hospital beds, wheelchairs, walkers, BiPAP, CPAP.",
    intro:
      "Rent the equipment you need for home care instead of buying it — delivered, installed, and collected when you're done.",
    includes: [
      "Oxygen concentrators and cylinders",
      "Hospital beds with side rails",
      "Wheelchairs and walkers",
      "BiPAP and CPAP machines",
      "Air mattresses for bed-sore prevention",
      "Delivery, installation and pickup",
    ],
    goodFor: "Families setting up home care who need equipment short-term.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
