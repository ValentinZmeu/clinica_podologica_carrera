import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '');
}

export function formatWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const baseUrl = `https://wa.me/${cleanPhone}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}
