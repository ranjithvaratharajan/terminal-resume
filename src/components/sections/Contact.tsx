"use client";

import { resumeData } from "@/lib/resume-data";
import { useScrollReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import MagneticButton from "@/components/ui/MagneticButton";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 });

  const { personal } = resumeData;

  return (
    <section id="contact" className="py-24 px-6" aria-label="Contact Information">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Contact" number="07" />

        <div ref={ref}>
          {/* Main CTA */}
          <div className="mb-16">
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Let&apos;s work together.
            </p>
            <p className="text-lg text-gray-500 max-w-xl">
              Open to senior engineering roles, technical leadership positions,
              and consulting opportunities. Currently based in {personal.location}.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            <div>
              <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">
                Email
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200 text-lg animated-link"
              >
                {personal.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">
                Phone
              </p>
              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200 text-lg animated-link"
              >
                {personal.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">
                Location
              </p>
              <p className="text-gray-900 font-medium text-lg">
                {personal.location}
              </p>
            </div>
          </div>

          {/* Social Links + Resume */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100">
            <MagneticButton
              href={personal.resumeUrl}
              download="Ranjith_Varatharajan_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wide rounded-none hover:bg-gray-800 transition-colors duration-200"
              ariaLabel="Download Resume PDF"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </MagneticButton>

            {personal.social.map((link) => {
              const Icon = link.platform.toLowerCase() === 'linkedin' ? FaLinkedin : 
                           link.platform.toLowerCase() === 'github' ? FaGithub : 
                           FaXTwitter;
              const label = link.platform.toLowerCase() === 'twitter' ? 'X' : link.platform;
              
              return (
                <MagneticButton
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium tracking-wide rounded-none hover:border-gray-900 hover:text-gray-900 transition-colors duration-200"
                  ariaLabel={`Visit ${link.platform} profile`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </MagneticButton>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
