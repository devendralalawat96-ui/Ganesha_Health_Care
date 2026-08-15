export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  sections: { heading: string; body: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "monsoon-care-tips-elderly-patients",
    title: "Monsoon care for elderly and bedridden patients",
    excerpt:
      "The rainy season brings a specific set of risks for older people and patients recovering at home — slippery floors, mosquito-borne illness and contaminated water. Here is what to change.",
    readMinutes: 5,
    sections: [
      {
        heading: "Why the monsoon is harder on patients",
        body: [
          "Every year between June and September, homes in Indore see the same pattern: more falls, more fevers, and more stomach infections. For a healthy adult these are an inconvenience. For someone who is elderly, bedridden or recovering from surgery, each one can undo weeks of progress.",
          "The risks are predictable, which means most of them can be prevented with small changes made before the season sets in rather than after someone falls ill.",
        ],
      },
      {
        heading: "Preventing falls indoors",
        body: [
          "Wet floors are the single biggest cause of monsoon injuries among older people. Water tracked in from the doorway, damp bathroom tiles and slippery stairs account for most of them.",
          "Keep a dry mat at every entrance and change it when it gets wet. Put anti-skid mats in the bathroom and beside the bed. Make sure passages are lit — grey daylight during heavy rain is much dimmer than people realise, especially for someone with weak eyesight.",
          "If the patient uses a walker or stick, check the rubber tips. Worn tips slide on wet tiles.",
        ],
      },
      {
        heading: "Water and food safety",
        body: [
          "Water contamination rises sharply during the monsoon. Boil drinking water or use a filter you trust, and do not assume stored water stays safe for days.",
          "Serve freshly cooked warm food. Avoid cut fruit and salads bought from outside, and be careful with leftovers — food spoils faster in humid weather even when refrigerated.",
          "For patients on a fixed diet or a Ryles tube feed, discuss any seasonal changes with the doctor rather than improvising.",
        ],
      },
      {
        heading: "Mosquitoes and standing water",
        body: [
          "Dengue and malaria peak after the rains. Empty anything that collects water — coolers, plant trays, buckets on the terrace, discarded containers in the yard — at least twice a week.",
          "Use nets over the bed for patients who cannot move themselves away from mosquitoes. Bedridden patients cannot swat or shift position, so they get bitten far more than anyone else in the house.",
        ],
      },
      {
        heading: "Skin and wound care in humid weather",
        body: [
          "Humidity keeps skin damp, and damp skin breaks down faster. For bedridden patients this raises the risk of bed sores considerably.",
          "Keep the skin clean and properly dry, especially in the folds. Change bedding more often than you would in dry weather. Check pressure points daily — the lower back, heels, hips and elbows.",
          "Any wound or dressing that gets wet needs changing immediately. Damp dressings invite infection.",
        ],
      },
      {
        heading: "When to call for help",
        body: [
          "Call a doctor if you see fever lasting more than two days, loose motions with signs of dehydration, breathlessness, a wound that looks red or smells, or any sudden confusion in an elderly patient.",
          "Confusion in particular is often dismissed as ordinary forgetfulness, when in fact it is a common early sign of infection in older people.",
        ],
      },
    ],
  },
  {
    slug: "caring-for-elderly-parents-at-home",
    title: "Caring for elderly parents at home: a practical guide",
    excerpt:
      "What actually changes when a parent needs daily help, and how to set up the home and the routine before a crisis forces the decision.",
    readMinutes: 6,
    sections: [
      {
        heading: "Start before it becomes urgent",
        body: [
          "Most families arrange care after a fall or a hospital admission, when everyone is exhausted and decisions get made in a hurry. If you have noticed your parent skipping meals, struggling on stairs, or forgetting medicines, that is the moment to plan — not after the emergency.",
          "Begin with an honest list of what they can still do independently and what they have quietly stopped doing. The gap between those two is the care you actually need.",
        ],
      },
      {
        heading: "Make the house safer first",
        body: [
          "Remove loose rugs and clear the path between the bed and the bathroom, which is where most night-time falls happen. Add a grab bar beside the toilet and in the bathing area, and keep a light on in the corridor overnight.",
          "Keep medicines in a weekly pill organiser rather than a drawer of strips. It makes missed doses visible to everyone in the family.",
        ],
      },
      {
        heading: "Decide what kind of help you need",
        body: [
          "Companion care suits a parent who is physically fine but should not be alone. Elderly care covers bathing, feeding and mobility. Home nursing is for clinical tasks — injections, dressing, catheter care.",
          "Many families start with a 12-hour day shift and extend to 24-hour cover only if nights become difficult. There is no need to commit to the maximum from day one.",
        ],
      },
      {
        heading: "Protect the primary caregiver",
        body: [
          "In most Indian households one person — usually a daughter or daughter-in-law — absorbs the entire load. Burnout in that person is the most common reason a home care arrangement collapses.",
          "Bringing in a professional caregiver for even part of the week is not a failure of duty. It is what keeps the family able to sustain care over months rather than weeks.",
        ],
      },
    ],
  },
  {
    slug: "bed-sore-prevention",
    title: "Bed sore prevention: what families get wrong",
    excerpt:
      "Pressure sores can appear within days on a bedridden patient. The prevention is simple, unglamorous, and has to happen around the clock.",
    readMinutes: 5,
    sections: [
      {
        heading: "Why they form so fast",
        body: [
          "A bed sore forms when constant pressure cuts off blood supply to skin over a bony area — the tailbone, heels, hips, elbows and the back of the head. On a frail patient this can begin in under two hours of lying in one position.",
          "The first sign is a patch of skin that stays red after the pressure is relieved. At that stage it is still reversible. Once the skin breaks, healing takes weeks and infection becomes a real risk.",
        ],
      },
      {
        heading: "The two-hourly rule",
        body: [
          "Reposition the patient at least every two hours, including at night. Alternate between left side, back and right side, using pillows to hold the position and to keep the knees and ankles from pressing against each other.",
          "This is the single most effective prevention measure, and it is also the one families most often let slip overnight when everyone is asleep.",
        ],
      },
      {
        heading: "Keep the skin dry and inspected",
        body: [
          "Moisture from sweat or incontinence softens skin and accelerates breakdown. Change soiled bedding immediately, pat the skin dry rather than rubbing, and avoid heavy talcum which cakes in skin folds.",
          "Inspect the pressure points every single day in good light. Ask the caregiver to report any redness rather than waiting for it to resolve.",
        ],
      },
      {
        heading: "Equipment that helps",
        body: [
          "An alternating-pressure air mattress redistributes weight automatically and is worth renting for any patient likely to be bedridden for more than a few weeks. Heel protectors and a proper hospital bed with adjustable height make repositioning far easier on the caregiver's back too.",
        ],
      },
    ],
  },
  {
    slug: "stroke-patient-care-at-home",
    title: "Caring for a stroke patient at home",
    excerpt:
      "The months after a stroke decide how much function returns. What home care should focus on during that window.",
    readMinutes: 6,
    sections: [
      {
        heading: "The recovery window is real",
        body: [
          "Most functional recovery after a stroke happens in the first three to six months. Consistent daily therapy during that period matters more than any single intervention later, which is why care at home has to be structured rather than improvised.",
        ],
      },
      {
        heading: "Positioning and preventing contractures",
        body: [
          "A weak or paralysed limb left unsupported will stiffen into a fixed position that is painful and very hard to reverse. Support the affected arm on a pillow, keep the shoulder from dragging, and move every joint through its full range daily.",
          "Never pull a stroke patient up by the weak arm. The shoulder joint is unstable after paralysis and dislocates easily.",
        ],
      },
      {
        heading: "Swallowing needs watching",
        body: [
          "Difficulty swallowing is common after a stroke and can send food into the lungs, causing pneumonia — one of the biggest causes of death in stroke survivors. Coughing during meals, a wet-sounding voice afterwards, or food pocketing in the cheek are all warning signs.",
          "Keep the patient fully upright for meals and for thirty minutes afterwards, and follow the consistency the doctor or speech therapist has advised.",
        ],
      },
      {
        heading: "Expect the emotional side",
        body: [
          "Depression after a stroke is extremely common and is often mistaken for laziness or stubbornness by the family. A patient refusing therapy is frequently a patient who is depressed, not uncooperative. Raise it with the treating doctor rather than pushing harder.",
        ],
      },
    ],
  },
  {
    slug: "diabetes-home-care",
    title: "Managing diabetes care at home",
    excerpt:
      "Daily monitoring, foot care and knowing which symptoms mean you call a doctor immediately.",
    readMinutes: 5,
    sections: [
      {
        heading: "Monitoring that actually informs treatment",
        body: [
          "Record readings with the time and whether they were before or after a meal. A notebook of bare numbers tells the doctor very little; a pattern showing consistent post-dinner highs tells them exactly what to adjust.",
        ],
      },
      {
        heading: "Foot care is not optional",
        body: [
          "Diabetic neuropathy means a wound on the foot may not be felt at all. Inspect both feet daily, including between the toes and the soles, and never let a diabetic patient walk barefoot even indoors.",
          "Any cut, blister or discolouration on a diabetic foot should be seen by a doctor promptly. Small foot wounds are how amputations begin.",
        ],
      },
      {
        heading: "Know the emergency signs",
        body: [
          "Low blood sugar — sweating, shaking, confusion, sudden irritability — needs fast-acting sugar immediately, then a proper meal. Very high sugar with vomiting, laboured breathing, or fruity-smelling breath is a medical emergency requiring hospital care.",
          "Every family member should know which is which, because the correct response to one is dangerous for the other.",
        ],
      },
    ],
  },
  {
    slug: "home-icu-guide",
    title: "Setting up an ICU at home: what it involves",
    excerpt:
      "Home ICU is genuinely possible for many long-term patients. Here is what equipment, staffing and cost actually look like.",
    readMinutes: 7,
    sections: [
      {
        heading: "When home ICU makes sense",
        body: [
          "Home ICU suits patients who are stable but dependent — on a ventilator long-term, in a prolonged coma, or in advanced illness where hospital admission adds infection risk without adding benefit. It is not appropriate for unstable patients who may need immediate surgical intervention.",
          "The decision should always be made with the treating intensivist, not independently by the family.",
        ],
      },
      {
        heading: "What gets installed",
        body: [
          "A typical home ICU setup includes a hospital bed with side rails, a multipara monitor for heart rate, oxygen saturation and blood pressure, an oxygen concentrator or cylinder supply, suction apparatus, and a ventilator where prescribed. An alternating-pressure mattress is standard for immobile patients.",
          "The room needs a stable power supply with backup, space to move around the bed on both sides, and reasonable ventilation.",
        ],
      },
      {
        heading: "Staffing is the real cost",
        body: [
          "Equipment is usually rented and is the smaller part of the budget. The recurring cost is nursing — critical-care trained nurses working in rotation to cover all 24 hours, which is what makes the arrangement safe.",
          "Even so, home ICU typically works out considerably less expensive than an equivalent hospital ICU stay over months, which is why families with long-term patients choose it.",
        ],
      },
      {
        heading: "Have an escalation plan",
        body: [
          "Agree in advance with the treating doctor on which readings or symptoms mean the patient goes back to hospital, and keep an ambulance service number by the bed. A home ICU without a clear escalation plan is where the arrangement becomes risky.",
        ],
      },
    ],
  },
  {
    slug: "dementia-care-tips",
    title: "Dementia care at home: tips that actually help",
    excerpt:
      "Routine, safety and how to respond when a parent does not recognise you — practical guidance for families.",
    readMinutes: 6,
    sections: [
      {
        heading: "Routine reduces confusion",
        body: [
          "Dementia patients cope far better when meals, bathing, walks and sleep happen at the same times every day. A predictable routine does more to reduce agitation than almost any other intervention, and it is free.",
          "Keep furniture where it is. Rearranging a familiar room can be genuinely disorienting.",
        ],
      },
      {
        heading: "Do not argue with the reality they are in",
        body: [
          "If your mother believes her late husband is coming home this evening, correcting her means she experiences that loss again, freshly, every time. Acknowledge the feeling and redirect gently to something else instead.",
          "This feels dishonest to most families at first. In practice it is the kinder approach, and it is what trained dementia caregivers are taught to do.",
        ],
      },
      {
        heading: "Plan for wandering",
        body: [
          "Wandering is common and dangerous, particularly after dark. Fit door chimes or latches high on the door where they are less noticeable, keep an ID card with your phone number on the patient at all times, and inform neighbours and the local guard.",
        ],
      },
      {
        heading: "Late afternoon is often the hardest",
        body: [
          "Many patients become more confused and agitated in the late afternoon and evening — commonly called sundowning. Keep the room well lit before dusk, reduce noise and television, and schedule demanding tasks like bathing for the morning instead.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
