"use client";

import { useCharacterReveal, useWordReveal } from "@/lib/animations";
import { resumeData } from "@/lib/resume-data";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Hero() {
  const nameRef = useCharacterReveal<HTMLHeadingElement>({
    stagger: 0.035,
    delay: 0.3,
    duration: 0.5,
  });
  const titleRef = useWordReveal<HTMLParagraphElement>({
    delay: 1.2,
    stagger: 0.05,
  });

  const { personal } = resumeData;

  const metrics = [
    { value: personal.yearsExperience, suffix: "+", label: "Years Experience" },
    { value: personal.totalCompanies, suffix: "", label: "Companies" },
    { value: personal.totalClients, suffix: "+", label: "Clients Served" },
    { value: personal.totalProjects, suffix: "+", label: "Projects Delivered" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 py-24"
      aria-label="Introduction"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tighter leading-[0.9] mb-6"
        >
          {personal.name}
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-500 font-normal tracking-tight max-w-2xl mx-auto mb-4"
        >
          {personal.title}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-sm md:text-base text-gray-400 font-mono tracking-widest uppercase mb-12 cursor-default"
        >
          <ScrambleText text={personal.tagline} />
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-14"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  duration={2000}
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium tracking-wide uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4"
        >
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
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
