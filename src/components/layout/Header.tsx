"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/lib/resume-data";
import MagneticText from "@/components/ui/MagneticText";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

const navItems = [
  { label: "Summary", href: "#summary" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ScrollSpy observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" } // trigger when section is in the top 40% of viewport
    );

    navItems.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(href);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3"
          : "bg-transparent py-6"
      }`}
      role="banner"
    >
      <nav
        className="max-w-5xl mx-auto px-6 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className={`font-bold text-lg tracking-tight transition-colors duration-200 ${
            scrolled ? "text-gray-900" : "text-gray-900"
          }`}
          aria-label="Back to top"
        >
          {resumeData.personal.firstName}
          <span className="text-blue-600">.</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href}>
                <MagneticText>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-900 animated-link ${
                      isActive ? "text-blue-600 after:w-full" : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </a>
                </MagneticText>
              </li>
            );
          })}
          <li>
            <a
              href={resumeData.personal.resumeUrl}
              download="Ranjith_Varatharajan_Resume.pdf"
              className="text-sm font-semibold text-white bg-gray-900 px-4 py-2 hover:bg-gray-800 transition-colors duration-200"
              aria-label="Download Resume"
            >
              Resume
            </a>
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <DarkModeToggle />
          <button
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-100 px-6 py-6"
          >
            <ul className="space-y-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block text-lg font-medium transition-colors ${
                        isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-4 border-t border-gray-100">
                <a
                  href={resumeData.personal.resumeUrl}
                  download="Ranjith_Varatharajan_Resume.pdf"
                  className="inline-block text-sm font-semibold text-white bg-gray-900 px-6 py-3"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
