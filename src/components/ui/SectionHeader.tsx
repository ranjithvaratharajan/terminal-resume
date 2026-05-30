"use client";

import { useScrollReveal } from "@/lib/animations";

interface SectionHeaderProps {
  title: string;
  number?: string;
}

export default function SectionHeader({ title, number }: SectionHeaderProps) {
  const ref = useScrollReveal<HTMLDivElement>({ y: 20, duration: 0.6 });

  return (
    <div ref={ref} className="mb-16 flex items-center gap-4">
      {number && (
        <span className="font-mono text-sm text-blue-600 tracking-wider">
          {number}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200 ml-4" aria-hidden="true" />
    </div>
  );
}
