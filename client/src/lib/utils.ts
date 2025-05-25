import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "LOW":
      return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
    case "MEDIUM":
      return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800";
    case "HIGH":
      return "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800";
    case "URGENT":
      return "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "OPEN":
      return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
    case "IN_PROGRESS":
      return "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800";
    case "RESOLVED":
      return "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800";
    case "CLOSED":
      return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800";
    default:
      return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800";
  }
}
