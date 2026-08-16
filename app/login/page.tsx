'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '@/src/components/auth/AuthLayout';
import { AuthField } from '@/src/components/auth/AuthField';

type LoginErrors = Partial<Record<'email' | 'password', string>>;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: LoginErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid work email address.';
    if (!password) nextErrors.password = 'Enter your password.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    window.setTimeout(() => router.push('/dashboard'), 650);
  };

  return (
    <AuthLayout mode="login">
      <div className="relative overflow-hidden rounded-[24px] border border-white bg-white/88 p-5 shadow-[0_24px_70px_rgba(32,75,114,0.14)] backdrop-blur-2xl sm:p-6">
        <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,#31E6B1,#43B5FF,transparent)]" />
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EAF4FF,#E8FFFB)] text-[#2584FF] shadow-sm"><ShieldCheck className="h-4 w-4" /></div>
          <div>
            <h1 className="atlas-display text-2xl font-black tracking-tight text-[#091536]">Welcome back</h1>
            <p className="mt-1 text-xs font-medium leading-5 text-[#657189]">Sign in to manage your training programs and expert network.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <AuthField id="email" label="Work email" icon={Mail} type="email" autoComplete="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <AuthField id="password" label="Password" icon={LockKeyhole} type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />

          <div className="flex items-center justify-between gap-4 text-[11px] font-bold">
            <label className="flex cursor-pointer items-center gap-2 text-[#56637B]">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-[#C8D4E1] accent-[#176BFF]" />
              Remember me
            </label>
            <button type="button" className="atlas-focus rounded text-[#176BFF] hover:text-[#0D5DE8]">Forgot password?</button>
          </div>

          <button type="submit" disabled={isSubmitting} className="atlas-focus group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#25C99A] bg-[#31E6B1] text-sm font-black text-[#071B2F] shadow-[0_12px_28px_rgba(49,230,177,0.24)] transition hover:-translate-y-0.5 hover:bg-[#55EFC1] hover:shadow-[0_16px_34px_rgba(49,230,177,0.30)] disabled:cursor-wait disabled:opacity-70">
            {isSubmitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#071B2F]/25 border-t-[#071B2F]" /> Signing in…</> : <>Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
          </button>
        </form>

        <div className="my-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-[#9AA5B8]"><span className="h-px flex-1 bg-[#E1E8F0]" />or<span className="h-px flex-1 bg-[#E1E8F0]" /></div>
        <button type="button" className="atlas-focus flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-[#D6E4F1] bg-[#FBFDFF] text-sm font-black text-[#26324C] transition hover:border-[#BDD3E8] hover:bg-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-black text-[#4285F4] shadow-sm">G</span>
          Continue with Google
        </button>

        <div className="mt-4 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-semibold text-[#68748A]">New to Atlas? <Link href="/register" className="atlas-focus rounded font-black text-[#176BFF] hover:text-[#0D5DE8]">Create an account</Link></p>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-[#8A95A8]"><CheckCircle2 className="h-3 w-3 text-[#20B98B]" />Secure sign-in</p>
        </div>
      </div>
    </AuthLayout>
  );
}
