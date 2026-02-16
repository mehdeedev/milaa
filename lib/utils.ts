import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPriceWithCommas(value: string | number) {
  if (!value) return ""
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function unformatPrice(value: string) {
  return value.replace(/,/g, "")
}

const faDigits = "۰۱۲۳۴۵۶۷۸۹"
const arDigits = "٠١٢٣٤٥٦٧٨٩"

export function normalizeDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => faDigits.indexOf(d).toString())
    .replace(/[٠-٩]/g, (d) => arDigits.indexOf(d).toString())
}
