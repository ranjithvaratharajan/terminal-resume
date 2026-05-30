"use client";

import { resumeData } from "@/lib/resume-data";
import { useScrollReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Experience() {
  const timelineRef = useScrollReveal<HTMLDivElement>({
    childSelector: ".timeline-item",
    stagger: 0.15,
    y: 50,
    duration: 0.7,
  });

  return (
    <section id="experience" className="py-24 px-6 bg-gray-50/50" aria-label="Work Experience">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Experience" number="02" />

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 md:left-[140px] top-0 bottom-0 w-px bg-gray-200"
            aria-hidden="true"
          />

          {resumeData.experience.map((job, index) => (
            <article
              key={job.id}
              className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-[140px_1fr] gap-8 mb-16 last:mb-0"
            >
              {/* Date column */}
              <div className="hidden md:block text-right pr-8">
                <time className="font-mono text-sm text-gray-400 leading-relaxed">
                  {job.startDate}
                  <br />
                  <span className="text-gray-300">—</span>
                  <br />
                  {job.endDate}
                </time>
              </div>

              {/* Timeline dot */}
              <div
                className="absolute left-0 md:left-[140px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white -translate-x-1/2 z-10"
                style={{
                  backgroundColor: index === 0 ? "#2563EB" : "#D1D5DB",
                  boxShadow:
                    index === 0 ? "0 0 0 4px rgba(37, 99, 235, 0.15)" : "none",
                }}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="md:pl-8">
                {/* Mobile date */}
                <time className="md:hidden block font-mono text-xs text-gray-400 mb-2 tracking-wide">
                  {job.startDate} — {job.endDate}
                </time>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-base font-medium text-blue-600 mb-4">
                  {job.company}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {job.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-5" aria-label={`Key responsibilities at ${job.company}`}>
                  {job.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-500"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-gray-300 mt-2 flex-shrink-0"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-1 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
