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
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-fp-gray">
            {label}
          </label>
        )}
        <div className="relative w-full flex items-center">
          {icon && (
            <div className="absolute left-3.5 z-10 text-fp-gray pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full bg-fp-surface/60 border rounded-xl text-fp-white placeholder-fp-gray/50',
              'transition-all duration-300',
              'focus:outline-none focus:border-fp-neon-blue focus:ring-2 focus:ring-fp-neon-blue/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error ? 'border-fp-neon-pink' : 'border-fp-border/60',
              icon ? 'pl-11' : 'pl-4',
              (iconRight || isPassword) ? 'pr-11' : 'pr-4',
              sizeStyles[inputSize],
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 z-10 text-fp-gray hover:text-fp-white transition-colors cursor-pointer p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          {!isPassword && iconRight && (
            <div className="absolute right-3.5 z-10 text-fp-gray pointer-events-none flex items-center justify-center">
              {iconRight}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-fp-neon-pink font-medium">{error}</p>}
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
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-fp-gray">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-fp-surface/60 border rounded-xl px-4 py-3 text-fp-white placeholder-fp-gray/50',
            'transition-all duration-300 min-h-[100px] resize-y',
            'focus:outline-none focus:border-fp-neon-blue focus:ring-2 focus:ring-fp-neon-blue/20',
            error ? 'border-fp-neon-pink' : 'border-fp-border/60',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-fp-neon-pink font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-fp-gray/70">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
