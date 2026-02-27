import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "CNY"): string {
  const formatter = new Intl.NumberFormat(
    currency === "CNY" ? "zh-CN" : "en-US",
    {
      style: "currency",
      currency: currency,
    }
  );
  return formatter.format(price);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
