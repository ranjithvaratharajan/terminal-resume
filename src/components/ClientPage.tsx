"use client";


import { resumeData } from "@/lib/resume-data";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Summary from "@/components/sections/Summary";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function ClientPage() {
  const { personal } = resumeData;

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Header />

      <main>
        <article itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content={personal.name} />
          <meta itemProp="jobTitle" content={personal.title} />
          <meta itemProp="url" content={personal.website} />
          <meta itemProp="email" content={personal.email} />
          <meta itemProp="telephone" content={personal.phone} />

          <Hero />
          <Summary />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Testimonials />
          <Contact />
        </article>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
