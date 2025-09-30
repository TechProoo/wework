import { BookOpen, Cpu, Wrench, MoreHorizontal } from "lucide-react";

export interface Category {
  name: string;
  color: string;
  icon: React.ElementType;
}

export const categories: Category[] = [
  {
    name: "AI/ML",
    color: "bg-yellow-200",
    icon: Cpu,
  },
  {
    name: "Frontend Development",
    color: "bg-purple-200",
    icon: BookOpen,
  },
  {
    name: "Software Architecture",
    color: "bg-green-200",
    icon: Wrench,
  },
  {
    name: "Digital Marketting",
    color: "bg-blue-200",
    icon: MoreHorizontal,
  },
];
