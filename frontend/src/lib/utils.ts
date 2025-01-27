import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a locale string
 * @param date - Date to format
 * @param locale - Locale to use (default: id-ID)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = "id-ID"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a number to a currency string
 * @param amount - Amount to format
 * @param currency - Currency to use (default: IDR)
 * @param locale - Locale to use (default: id-ID)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency = "IDR",
  locale = "id-ID"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Truncates a string to a specified length
 * @param str - String to truncate
 * @param length - Maximum length (default: 100)
 * @returns Truncated string
 */
export function truncateString(str: string, length = 100): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Generates a random string
 * @param length - Length of the string (default: 8)
 * @returns Random string
 */
export function generateId(length = 8): string {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Debounces a function
 * @param fn - Function to debounce
 * @param ms - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
