import { redirect } from "next/navigation";
import { getAdmin, createSession } from "@/lib/auth";
import { site } from "@/lib/site";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) redirect("/admin/login?error=unconfigured");
  if (email !== expectedEmail || password !== expectedPassword) redirect("/admin/login?error=invalid");

  await createSession(email);
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getAdmin()) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="container-page flex min-h-[70vh] max-w-md flex-col justify-center py-14">
      <h1 className="text-2xl">Admin login</h1>
      <p className="mt-2 text-[14px] text-inksoft">{site.shortName} internal tools.</p>

      {error && (
        <p className="mt-5 rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-[13.5px] text-alert">
          {error === "unconfigured"
            ? "Admin credentials are not configured on the server."
            : "Incorrect email or password."}
        </p>
      )}

      <form action={login} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-[13px] font-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-[13px] font-semibold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
          />
        </div>
        <button type="submit" className="btn-primary w-full">Sign in</button>
      </form>
    </div>
  );
}
