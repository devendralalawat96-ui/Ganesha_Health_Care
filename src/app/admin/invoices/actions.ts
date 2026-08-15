"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const invoiceSchema = z.object({
  patientName: z.string().min(1),
  patientPhone: z.string().min(6),
  patientAddr: z.string().optional(),
  serviceName: z.string().min(1),
  periodFrom: z.string().min(1),
  periodTo: z.string().min(1),
  amount: z.coerce.number().int().positive(),
  notes: z.string().optional(),
});

async function nextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count();
  return `GHC-${year}-${String(count + 1).padStart(4, "0")}`;
}

export async function createInvoice(formData: FormData) {
  await requireAdmin();

  // An invoice can cover several services, so `serviceName` arrives as repeated
  // form entries. Object.fromEntries would keep only the last one.
  const services = formData
    .getAll("serviceName")
    .map((v) => String(v).trim())
    .filter(Boolean);

  const parsed = invoiceSchema.safeParse({
    ...Object.fromEntries(formData),
    serviceName: services.join(", "),
  });
  if (!parsed.success) redirect("/admin/invoices/new?error=invalid");

  const d = parsed.data;
  await prisma.invoice.create({
    data: {
      number: await nextInvoiceNumber(),
      patientName: d.patientName,
      patientPhone: d.patientPhone,
      patientAddr: d.patientAddr || null,
      serviceName: d.serviceName,
      periodFrom: new Date(d.periodFrom),
      periodTo: new Date(d.periodTo),
      amount: d.amount,
      notes: d.notes || null,
    },
  });

  revalidatePath("/admin/invoices");
  redirect("/admin/invoices");
}

export async function updateInvoice(formData: FormData) {
  await requireAdmin();

  const invoiceId = String(formData.get("invoiceId") ?? "");
  if (!invoiceId) redirect("/admin/invoices");

  const services = formData
    .getAll("serviceName")
    .map((v) => String(v).trim())
    .filter(Boolean);

  const parsed = invoiceSchema.safeParse({
    ...Object.fromEntries(formData),
    serviceName: services.join(", "),
  });
  if (!parsed.success) redirect(`/admin/invoices/${invoiceId}/edit?error=invalid`);

  const existing = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!existing) redirect("/admin/invoices");

  const d = parsed.data;

  // Editing the total must not leave the invoice owing less than was already
  // collected, which would make the payment history inconsistent.
  if (d.amount < existing.paidAmount) {
    redirect(`/admin/invoices/${invoiceId}/edit?error=below-paid`);
  }

  // The total may have moved across the paid threshold in either direction.
  const status =
    existing.status === "CANCELLED"
      ? "CANCELLED"
      : existing.paidAmount === 0
        ? "UNPAID"
        : existing.paidAmount >= d.amount
          ? "PAID"
          : "PARTIAL";

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      patientName: d.patientName,
      patientPhone: d.patientPhone,
      patientAddr: d.patientAddr || null,
      serviceName: d.serviceName,
      periodFrom: new Date(d.periodFrom),
      periodTo: new Date(d.periodTo),
      amount: d.amount,
      notes: d.notes || null,
      status,
    },
  });

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoiceId}`);
}

export async function recordPayment(formData: FormData) {
  await requireAdmin();

  const invoiceId = String(formData.get("invoiceId") ?? "");
  const amount = Number(formData.get("amount"));
  const method = String(formData.get("method") ?? "UPI");
  const reference = String(formData.get("reference") ?? "").trim();

  if (!invoiceId || !Number.isFinite(amount) || amount <= 0) {
    redirect(`/admin/invoices/${invoiceId}?error=invalid`);
  }

  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) redirect("/admin/invoices");

  const paidAmount = invoice.paidAmount + amount;
  const status = paidAmount >= invoice.amount ? "PAID" : "PARTIAL";

  await prisma.$transaction([
    prisma.payment.create({
      data: { invoiceId, amount, method, reference: reference || null },
    }),
    prisma.invoice.update({
      where: { id: invoiceId },
      data: { paidAmount, status },
    }),
  ]);

  revalidatePath(`/admin/invoices/${invoiceId}`);
  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${invoiceId}`);
}

export async function cancelInvoice(formData: FormData) {
  await requireAdmin();

  const invoiceId = String(formData.get("invoiceId") ?? "");
  if (!invoiceId) redirect("/admin/invoices");

  await prisma.invoice.update({ where: { id: invoiceId }, data: { status: "CANCELLED" } });

  revalidatePath("/admin/invoices");
  redirect("/admin/invoices");
}
