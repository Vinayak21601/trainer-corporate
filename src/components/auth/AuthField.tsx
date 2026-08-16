'use client';

import { ComponentType, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ComponentType<{ className?: string }>;
  error?: string;
}

export function AuthField({ label, icon: Icon, error, id, type = 'text', ...props }: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const resolvedType = isPassword && showPassword ? 'text' : type;
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-[11px] font-black text-[#172343]">{label}</span>
      <span className={`group flex h-11 items-center gap-2.5 rounded-xl border bg-[#FBFDFF] px-2 transition-all hover:bg-white focus-within:bg-white focus-within:ring-4 ${error ? 'border-[#DC3F4F] focus-within:border-[#DC3F4F] focus-within:ring-[#DC3F4F]/10' : 'border-[#D6E4F1] hover:border-[#BDD3E8] focus-within:border-[#2584FF] focus-within:ring-[#2584FF]/10'}`}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7FF] text-[#66809E] transition-colors group-focus-within:bg-[#E2F2FF] group-focus-within:text-[#2584FF]">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <input
          {...props}
          id={id}
          type={resolvedType}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#091536] outline-none placeholder:font-medium placeholder:text-[#9AA5B8]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="atlas-focus rounded-md p-1 text-[#8490A7] hover:text-[#2584FF]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </span>
      {error && <span id={errorId} className="mt-1 block text-[11px] font-semibold text-[#C62E40]">{error}</span>}
    </label>
  );
}
