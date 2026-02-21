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

export function formatJalaliDate(date: Date, option?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    ...option
  }).format(date);
}

export function shortenString(str: string, maxLength = 19) {
  if (str.length <= maxLength) return str;

  const lastDotIndex = str.lastIndexOf(".");

  if (lastDotIndex === -1 || lastDotIndex === str.length - 1) {
    return str.slice(0, maxLength - 3) + "...";
  }

  const extension = str.slice(lastDotIndex);

  const lastChars = str.slice(lastDotIndex - 3, lastDotIndex);

  const remainingLength = maxLength - 3 - lastChars.length - extension.length;

  if (remainingLength < 3) {
    return str.slice(0, 3) + "..." + lastChars + extension;
  }

  const beginning = str.slice(0, remainingLength);

  return beginning + "..." + lastChars + extension;
}
