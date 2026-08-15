"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const caregiverSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  phone: z.string().optional(),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  qualifications: z.string().min(1),
  experience: z.coerce.number().int().min(0),
  languages: z.string().min(1),
  gender: z.string().min(1),
  bio: z.string().optional(),
});

export async function createCaregiver(formData: FormData) {
  await requireAdmin();

  // Lets the salary page send you back where you started after adding someone.
  const returnTo = String(formData.get("returnTo") ?? "");
  const back = returnTo === "salary" ? "/admin/salary" : "/admin/caregivers";

  const parsed = caregiverSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(`/admin/caregivers/new?error=invalid${returnTo ? `&from=${returnTo}` : ""}`);
  }

  const d = parsed.data;
  await prisma.caregiver.create({
    data: {
      name: d.name,
      role: d.role,
      phone: d.phone || null,
      idType: d.idType || null,
      idNumber: d.idNumber || null,
      qualifications: d.qualifications,
      experience: d.experience,
      languages: d.languages,
      gender: d.gender,
      bio: d.bio || null,
    },
  });

  revalidatePath("/admin/caregivers");
  revalidatePath("/caregivers");
  revalidatePath("/admin/salary");
  redirect(back);
}

export async function toggleCaregiverActive(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const active = formData.get("active") === "true";
  if (!id) redirect("/admin/caregivers");

  await prisma.caregiver.update({ where: { id }, data: { active: !active } });

  revalidatePath("/admin/caregivers");
  revalidatePath("/caregivers");
  redirect("/admin/caregivers");
}
