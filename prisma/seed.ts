import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seeds two example caregivers so the /caregivers page and the admin screens
 * are not empty on a fresh database. Replace these with real staff from
 * /admin/caregivers before launch.
 */
const caregivers = [
  {
    name: "Example Caregiver (replace me)",
    role: "Home Nurse",
    qualifications: "GNM Nursing",
    experience: 5,
    languages: "Hindi, English",
    gender: "Female",
    bio: "Sample record created by the seed script. Edit or delete this from the admin panel.",
    verified: true,
    active: true,
  },
  {
    name: "Example Attendant (replace me)",
    role: "Patient Attendant",
    qualifications: "Certified Caregiver",
    experience: 3,
    languages: "Hindi",
    gender: "Male",
    bio: "Sample record created by the seed script. Edit or delete this from the admin panel.",
    verified: true,
    active: true,
  },
];

async function main() {
  const existing = await prisma.caregiver.count();
  if (existing > 0) {
    console.log(`Caregivers already present (${existing}) — skipping seed.`);
    return;
  }

  await prisma.caregiver.createMany({ data: caregivers });
  console.log(`Seeded ${caregivers.length} example caregivers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
