/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Input Validators
   Client-side validation utilities for forms
   ────────────────────────────────────────────────────────────── */

// ─── Email ──────────────────────────────────────────────────

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email.trim()) return { valid: false, error: 'Email is required' };
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return { valid: false, error: 'Please enter a valid email address' };
  return { valid: true };
}

// ─── Password ───────────────────────────────────────────────

export interface PasswordStrength {
  score: number; // 0–4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
  color: string;
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Password must contain an uppercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, error: 'Password must contain a number' };
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { valid: false, error: 'Password must contain a special character' };
  }
  return { valid: true };
}

export function getPasswordStrength(password: string): PasswordStrength {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const labels: Record<number, PasswordStrength['label']> = {
    0: 'Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Good',
    4: 'Strong',
    5: 'Very Strong',
  };

  const colors: Record<number, string> = {
    0: '#FF006E',
    1: '#FF006E',
    2: '#FFD700',
    3: '#06FFC9',
    4: '#00D4FF',
    5: '#8B5CF6',
  };

  return {
    score: Math.min(score, 4),
    label: labels[score],
    color: colors[score],
    checks,
  };
}

// ─── Phone ──────────────────────────────────────────────────

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone.trim()) return { valid: false, error: 'Phone number is required' };
  const re = /^[+]?[\d\s-]{10,15}$/;
  if (!re.test(phone.replace(/\s/g, ''))) {
    return { valid: false, error: 'Please enter a valid phone number' };
  }
  return { valid: true };
}

// ─── URL ────────────────────────────────────────────────────

export function validateURL(url: string): { valid: boolean; error?: string } {
  if (!url.trim()) return { valid: true }; // URL fields are often optional
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Please enter a valid URL' };
  }
}

// ─── File ───────────────────────────────────────────────────

export function validateFileSize(
  file: File,
  maxSizeBytes: number
): { valid: boolean; error?: string } {
  if (file.size > maxSizeBytes) {
    const maxMB = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    return { valid: false, error: `File size must be under ${maxMB}MB` };
  }
  return { valid: true };
}

export function validateFileType(
  file: File,
  allowedTypes: string[]
): { valid: boolean; error?: string } {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return {
      valid: false,
      error: `File type not allowed. Accepted: ${allowedTypes.join(', ')}`,
    };
  }
  return { valid: true };
}

// ─── General ────────────────────────────────────────────────

export function validateRequired(value: string, fieldName: string): { valid: boolean; error?: string } {
  if (!value.trim()) return { valid: false, error: `${fieldName} is required` };
  return { valid: true };
}

export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): { valid: boolean; error?: string } {
  if (value.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  return { valid: true };
}

export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): { valid: boolean; error?: string } {
  if (value.length > maxLength) {
    return { valid: false, error: `${fieldName} must be at most ${maxLength} characters` };
  }
  return { valid: true };
}
