/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Input Component
   Styled form input with label, error, icon, and focus glow
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, iconRight, inputSize = 'md', className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const sizeStyles = {
      sm: 'py-2 text-sm',
      md: 'py-2.5 text-sm',
      lg: 'py-3 text-base',
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-fp-gray">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fp-gray">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full bg-fp-surface/50 border rounded-xl px-4 text-fp-white placeholder-fp-gray/50',
              'transition-all duration-300',
              'focus:outline-none focus:border-fp-neon-blue/60 focus:ring-2 focus:ring-fp-neon-blue/20',
              'focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-fp-neon-pink/60' : 'border-fp-border/50',
              icon ? 'pl-10' : '',
              (iconRight || isPassword) ? 'pr-10' : '',
              sizeStyles[inputSize],
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fp-gray hover:text-fp-white transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          {!isPassword && iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-fp-gray">
              {iconRight}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-fp-neon-pink">{error}</p>}
        {!error && helperText && <p className="text-xs text-fp-gray/70">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

// ─── Textarea ───────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-fp-gray">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-fp-surface/50 border rounded-xl px-4 py-3 text-fp-white placeholder-fp-gray/50',
            'transition-all duration-300 min-h-[100px] resize-y',
            'focus:outline-none focus:border-fp-neon-blue/60 focus:ring-2 focus:ring-fp-neon-blue/20',
            error ? 'border-fp-neon-pink/60' : 'border-fp-border/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-fp-neon-pink">{error}</p>}
        {!error && helperText && <p className="text-xs text-fp-gray/70">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
