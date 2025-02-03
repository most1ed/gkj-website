import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with support for conditional classes
 * @param inputs - Tailwind CSS class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date in Indonesian locale with optional formatting options
 * @param date - Date to format
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string, 
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }
): string {
  try {
    return new Date(date).toLocaleDateString('id-ID', options)
  } catch (error) {
    console.warn(`Invalid date format: ${date}`)
    return 'Invalid Date'
  }
}

/**
 * Truncates text to a specified maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - Ellipsis character(s)
 * @returns Truncated text
 */
export function truncateText(
  text: string, 
  maxLength: number = 100, 
  ellipsis: string = '...'
): string {
  if (!text) return ''
  return text.length <= maxLength 
    ? text 
    : text.substring(0, maxLength).trim() + ellipsis
}

/**
 * Generates a cryptographically more secure unique ID
 * @returns Unique identifier
 */
export function generateUniqueId(): string {
  return crypto.randomUUID()
}

/**
 * Capitalizes the first letter of a string
 * @param str - Input string
 * @returns String with first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

/**
 * Sorts dates in descending order
 * @param a - First date
 * @param b - Second date
 * @returns Numerical comparison result
 */
export function sortByDate(a: Date | string, b: Date | string): number {
  return new Date(b).getTime() - new Date(a).getTime()
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns Boolean indicating email validity
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}

/**
 * Creates a debounced version of a function
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F, 
  delay: number = 300
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}

/**
 * Safely parses a JSON string
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed JSON or fallback
 */
export function safeJsonParse<T>(
  jsonString: string, 
  fallback: T
): T {
  try {
    return JSON.parse(jsonString)
  } catch {
    return fallback
  }
}

/**
 * Converts a value to a number safely
 * @param value - Value to convert
 * @param fallback - Fallback number if conversion fails
 * @returns Converted number
 */
export function safeNumber(
  value: unknown, 
  fallback: number = 0
): number {
  const num = Number(value)
  return isNaN(num) ? fallback : num
}