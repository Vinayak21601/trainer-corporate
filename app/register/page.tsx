'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, Check, LockKeyhole, Mail, UserRound, UsersRound } from 'lucide-react';
import { AuthLayout } from '@/src/components/auth/AuthLayout';
import { AuthField } from '@/src/components/auth/AuthField';

type AccountType = 'organization' | 'trainer';
type RegisterErrors = Partial<Record<'name' | 'email' | 'organization' | 'password' | 'terms', string>>;

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>('organization');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('role') === 'trainer') setAccountType('trainer');
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: RegisterErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid work email address.';
    if (accountType === 'organization' && organization.trim().length < 2) nextErrors.organization = 'Enter your organization name.';
    if (password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    if (!acceptedTerms) nextErrors.terms = 'Accept the terms to continue.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_user', JSON.stringify({ name, email, organization }));
    }
    window.setTimeout(() => router.push(accountType === 'trainer' ? '/trainer-portal' : '/create-requirement'), 650);
  };

  return (
    <AuthLayout mode="register">
      <div className="relative overflow-hidden rounded-[24px] border border-white bg-white/88 p-5 shadow-[0_24px_70px_rgba(32,75,114,0.14)] backdrop-blur-2xl sm:p-6">
        <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,#31E6B1,#43B5FF,transparent)]" />
        <div className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#176BFF]">Create your profile</div>
            <span className="hidden items-center gap-1 rounded-full border border-[#C9F1E3] bg-[#E9F9F3] px-3 py-1 text-[10px] font-black text-[#14966F] sm:inline-flex"><Check className="h-3 w-3" />Free to join</span>
          </div>
          <h1 className="atlas-display mt-1.5 text-2xl font-black tracking-tight text-[#091536]">Create your Atlas account</h1>
          <p className="mt-1 text-xs font-medium text-[#657189]">Choose how you’ll use the marketplace.</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Account type">
          {([
            { id: 'organization' as const, label: 'I’m hiring trainers', detail: 'For L&D teams', icon: Building2 },
            { id: 'trainer' as const, label: 'I’m a trainer', detail: 'For facilitators', icon: UsersRound },
          ]).map(({ id, label, detail, icon: Icon }) => {
            const selected = accountType === id;
            return (
              <button key={id} type="button" role="radio" aria-checked={selected} onClick={() => setAccountType(id)} className={`atlas-focus group relative rounded-xl border px-3 py-2.5 text-left transition ${selected ? 'border-[#23C99A] bg-[linear-gradient(135deg,#F0FCF8,#F7FFFC)] shadow-[0_8px_22px_rgba(35,201,154,0.10)]' : 'border-[#D9E3ED] bg-[#FBFDFF] hover:border-[#AFC5D9] hover:bg-white'}`}>
                {selected && <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#23C99A] text-white"><Check className="h-3 w-3" /></span>}
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${selected ? 'bg-[#DDF8EF] text-[#13A97D]' : 'bg-[#EAF4FF] text-[#2584FF]'}`}><Icon className="h-4 w-4" /></span>
                <span className="mt-1.5 block text-[11px] font-black text-[#172343]">{label}</span>
                <span className="mt-0.5 block text-[10px] font-semibold text-[#7B879B]">{detail}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <AuthField id="name" label="Full name" icon={UserRound} autoComplete="name" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
            <AuthField id="register-email" label="Work email" icon={Mail} type="email" autoComplete="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            {accountType === 'organization' && <AuthField id="organization" label="Organization name" icon={Building2} autoComplete="organization" placeholder="Acme Corporation" value={organization} onChange={(e) => setOrganization(e.target.value)} error={errors.organization} />}
            <AuthField id="register-password" label="Password" icon={LockKeyhole} type="password" autoComplete="new-password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          </div>
          <p className={`flex items-center gap-1.5 text-[10px] font-semibold ${password.length >= 8 ? 'text-[#14966F]' : 'text-[#7B879B]'}`}><Check className="h-3 w-3" />Password must be at least 8 characters</p>

          <div>
            <label className="flex cursor-pointer items-start gap-2.5 text-[11px] font-semibold leading-4 text-[#657189]">
              <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#C8D4E1] accent-[#176BFF]" />
              <span>I agree to the <button type="button" className="font-black text-[#176BFF]">Terms of Service</button> and <button type="button" className="font-black text-[#176BFF]">Privacy Policy</button>.</span>
            </label>
            {errors.terms && <p className="mt-1.5 text-xs font-semibold text-[#C62E40]">{errors.terms}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="atlas-focus group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#25C99A] bg-[#31E6B1] text-sm font-black text-[#071B2F] shadow-[0_12px_28px_rgba(49,230,177,0.24)] transition hover:-translate-y-0.5 hover:bg-[#55EFC1] hover:shadow-[0_16px_34px_rgba(49,230,177,0.30)] disabled:cursor-wait disabled:opacity-70">
            {isSubmitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#071B2F]/25 border-t-[#071B2F]" /> Creating account…</> : <>Create account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
          </button>
        </form>

        <p className="mt-4 text-center text-xs font-semibold text-[#68748A]">Already have an account? <Link href="/login" className="atlas-focus rounded font-black text-[#176BFF] hover:text-[#0D5DE8]">Sign in</Link></p>
      </div>
    </AuthLayout>
  );
}
