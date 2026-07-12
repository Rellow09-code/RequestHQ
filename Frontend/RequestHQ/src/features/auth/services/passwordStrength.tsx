import type { PasswordStrength } from "../types/specific_types";

export function gaugePasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (!password) {
    return { score: 0, label: "Very Weak" };
  }

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Lowercase letters
  if (/[a-z]/.test(password)) score++;

  // Uppercase letters
  if (/[A-Z]/.test(password)) score++;

  // Numbers
  if (/[0-9]/.test(password)) score++;

  // Special characters
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Convert score → label
  let label: PasswordStrength["label"];

  if (score <= 1) label = "Very Weak";
  else if (score === 2) label = "Weak";
  else if (score === 3) label = "Medium";
  else if (score === 4 || score === 5) label = "Strong";
  else label = "Very Strong";

  return { score, label };
}