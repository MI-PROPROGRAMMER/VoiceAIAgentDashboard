import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(input: string) {
  const date = new Date(input)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date)
}

export function formatDateGroup(input: string) {
  const date = new Date(input)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function getDateKey(input: string) {
  const date = new Date(input)
  return date.toISOString().split("T")[0] // Returns YYYY-MM-DD
}

export function groupByDate<T extends { datetime: string }>(items: T[]) {
  const grouped = new Map<string, T[]>()
  
  items.forEach((item) => {
    const dateKey = getDateKey(item.datetime)
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, [])
    }
    grouped.get(dateKey)!.push(item)
  })
  
  // Sort each group by datetime (newest first)
  grouped.forEach((group) => {
    group.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
  })
  
  // Convert to array and sort by date (newest first)
  return Array.from(grouped.entries())
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([dateKey, items]) => ({
      dateKey,
      dateLabel: formatDateGroup(items[0].datetime),
      items,
    }))
}

export function formatDateString(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function groupAppointmentsByDate<T extends { date: string }>(items: T[]) {
  const grouped = new Map<string, T[]>()
  
  items.forEach((item) => {
    const dateKey = item.date // Already in YYYY-MM-DD format
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, [])
    }
    grouped.get(dateKey)!.push(item)
  })
  
  // Sort each group by time (earliest first for appointments)
  grouped.forEach((group) => {
    group.sort((a, b) => {
      if ('time' in a && 'time' in b) {
        return (a as any).time.localeCompare((b as any).time)
      }
      return 0
    })
  })
  
  // Convert to array and sort by date (newest first)
  return Array.from(grouped.entries())
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([dateKey, items]) => ({
      dateKey,
      dateLabel: formatDateString(items[0].date),
      items,
    }))
}
