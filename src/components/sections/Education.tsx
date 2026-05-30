"use client";

import { resumeData } from "@/lib/resume-data";
import { useScrollReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Education() {
  const ref = useScrollReveal<HTMLDivElement>({
    childSelector: ".education-item",
    stagger: 0.15,
    y: 30,
    duration: 0.6,
  });

  return (
    <section id="education" className="py-24 px-6" aria-label="Education">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Education" number="05" />

        <div ref={ref} className="space-y-10">
          {resumeData.education.map((edu) => (
            <article key={edu.id} className="education-item">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                <time className="font-mono text-sm text-gray-400 tracking-wide flex-shrink-0 sm:w-32 sm:text-right">
                  {edu.startYear} — {edu.endYear}
                </time>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-500 mt-1">{edu.institution}</p>
                  {edu.grade && (
                    <p className="text-sm text-gray-400 mt-1 font-mono">
                      {edu.grade}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
