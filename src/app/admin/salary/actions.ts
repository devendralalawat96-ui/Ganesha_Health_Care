"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const salarySchema = z.object({
  caregiverId: z.string().min(1),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2020).max(2100),
  baseAmount: z.coerce.number().int().min(0),
  bonus: z.coerce.number().int().min(0),
  deductions: z.coerce.number().int().min(0),
  notes: z.string().optional(),
});

export async function recordSalary(formData: FormData) {
  await requireAdmin();

  const parsed = salarySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/salary?error=invalid");

  const d = parsed.data;
  const netAmount = d.baseAmount + d.bonus - d.deductions;
  if (netAmount < 0) redirect("/admin/salary?error=negative");

  const values = {
    baseAmount: d.baseAmount,
    bonus: d.bonus,
    deductions: d.deductions,
    netAmount,
    notes: d.notes || null,
  };

  await prisma.salaryRecord.upsert({
    where: {
      caregiverId_month_year: { caregiverId: d.caregiverId, month: d.month, year: d.year },
    },
    create: { caregiverId: d.caregiverId, month: d.month, year: d.year, ...values },
    update: values,
  });

  revalidatePath("/admin/salary");
  redirect("/admin/salary");
}

export async function toggleSalaryPaid(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "");
  if (!id) redirect("/admin/salary");

  // Read the current state rather than trusting the form, so the toggle is
  // correct even from pages that do not post the previous value.
  const current = await prisma.salaryRecord.findUnique({ where: { id } });
  if (!current) redirect("/admin/salary");

  await prisma.salaryRecord.update({
    where: { id },
    data: { paid: !current.paid, paidAt: current.paid ? null : new Date() },
  });

  revalidatePath("/admin/salary");
  revalidatePath(`/admin/salary/${id}`);
  redirect(returnTo === "slip" ? `/admin/salary/${id}` : "/admin/salary");
}

export async function updateSalary(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/salary");

  const parsed = salarySchema.omit({ caregiverId: true }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/salary/${id}/edit?error=invalid`);

  const d = parsed.data;
  const netAmount = d.baseAmount + d.bonus - d.deductions;
  if (netAmount < 0) redirect(`/admin/salary/${id}/edit?error=negative`);

  await prisma.salaryRecord.update({
    where: { id },
    data: {
      month: d.month,
      year: d.year,
      baseAmount: d.baseAmount,
      bonus: d.bonus,
      deductions: d.deductions,
      netAmount,
      notes: d.notes || null,
    },
  });

  revalidatePath("/admin/salary");
  revalidatePath(`/admin/salary/${id}`);
  redirect(`/admin/salary/${id}`);
}
