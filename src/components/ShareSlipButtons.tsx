"use client";

import { inr } from "@/lib/format";
import { site } from "@/lib/site";

type Props = {
  caregiverName: string;
  caregiverPhone: string | null;
  period: string;
  baseAmount: number;
  bonus: number;
  deductions: number;
  netAmount: number;
  paid: boolean;
};

export default function ShareSlipButtons(props: Props) {
  const { caregiverName, caregiverPhone, period, baseAmount, bonus, deductions, netAmount, paid } =
    props;

  const lines = [
    `${site.name}`,
    ``,
    `Salary slip — ${period}`,
    `Name: ${caregiverName}`,
    ``,
    `Base pay: ${inr(baseAmount)}`,
    bonus > 0 ? `Bonus: ${inr(bonus)}` : null,
    deductions > 0 ? `Deductions: -${inr(deductions)}` : null,
    `Net pay: ${inr(netAmount)}`,
    ``,
    paid ? `Status: Paid` : `Status: Payment pending`,
    ``,
    `Questions? Call ${site.phoneDisplay}`,
  ].filter(Boolean);

  const text = lines.join("\n");
  const digits = (caregiverPhone ?? "").replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;

  return (
    <div className="mt-5 flex flex-col gap-2">
      {digits ? (
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !py-2 !text-[13px]"
        >
          Send on WhatsApp
        </a>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-3 py-2.5 text-[12.5px] leading-relaxed text-sage">
          Add a phone number to this caregiver to send the slip on WhatsApp.
        </p>
      )}

      <button
        type="button"
        onClick={() => window.print()}
        className="btn-outline !py-2 !text-[13px]"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
