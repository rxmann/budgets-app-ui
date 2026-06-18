import { SignupForm } from "@/components/form/SignupForm";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 md:p-10 relative">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-[420px] flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <SignupForm />
        </div>
        <div className="text-center">
          <p className="text-[10px] tracking-widest text-muted-foreground font-semibold uppercase">
            BUDJET &bull; SECURE CLOUD LEDGER &bull; BUILT WITH PRECISION
          </p>
        </div>
      </div>
    </div>
  );
}
