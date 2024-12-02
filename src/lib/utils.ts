import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatMoney(amount: number) {
  const formatter = new Intl.NumberFormat("en-In",{
    style: "currency",
    currency: "INR"
  });
  return formatter.format(amount);
}
