"use client";

import { resumeData } from "@/lib/resume-data";
import { useScrollReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";

export default function Testimonials() {
  const ref = useScrollReveal<HTMLDivElement>({
    childSelector: ".testimonial-card",
    stagger: 0.12,
    y: 30,
    duration: 0.6,
  });

  return (
    <section
      id="testimonials"
      className="py-24 px-6 bg-gray-50/50"
      aria-label="Testimonials"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Testimonials" number="06" />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {resumeData.testimonials.map((testimonial) => (
            <TiltCard
              key={testimonial.id}
              className="testimonial-card group"
              rotationIntensity={6}
            >
              <blockquote
                className="border border-gray-100 rounded-sm p-8 hover:border-gray-200 transition-colors duration-300 relative bg-white h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
              {/* Quotation mark */}
              <span
                className="absolute top-4 right-6 text-6xl text-gray-100 font-serif leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="text-gray-600 leading-relaxed text-sm mb-6 relative z-10">
                {testimonial.quote}
              </p>

              <footer className="relative z-10">
                <cite className="not-italic">
                  <p className="text-sm font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </cite>
              </footer>
            </blockquote>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
