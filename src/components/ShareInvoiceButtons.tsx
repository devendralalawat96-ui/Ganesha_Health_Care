"use client";

import { inr } from "@/lib/format";
import { site } from "@/lib/site";

type Props = {
  number: string;
  patientName: string;
  patientPhone: string;
  serviceName: string;
  amount: number;
  due: number;
  upiLink: string;
};

export default function ShareInvoiceButtons(props: Props) {
  const { number, patientName, patientPhone, serviceName, amount, due, upiLink } = props;

  const lines = [
    `${site.name}`,
    ``,
    `Invoice: ${number}`,
    `Patient: ${patientName}`,
    `Service: ${serviceName}`,
    `Total: ${inr(amount)}`,
    due > 0 ? `Amount due: ${inr(due)}` : `Status: Paid in full — thank you.`,
  ];

  if (due > 0) {
    lines.push(``, `Pay by UPI to: ${site.upiId}`, `(${site.upiName})`);
  }

  lines.push(``, `Questions? Call ${site.phoneDisplay}`);

  const text = lines.join("\n");
  const digits = patientPhone.replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;

  return (
    <div className="mt-5 flex flex-col gap-2">
      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary !py-2 !text-[13px]"
      >
        Send on WhatsApp
      </a>

      {upiLink && (
        <a href={upiLink} className="btn-outline !py-2 !text-[13px]">
          Open UPI payment
        </a>
      )}

      <button type="button" onClick={() => window.print()} className="btn-outline !py-2 !text-[13px]">
        Print / Save as PDF
      </button>
    </div>
  );
}
