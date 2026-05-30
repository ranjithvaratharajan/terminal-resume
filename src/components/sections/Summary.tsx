"use client";

import { resumeData } from "@/lib/resume-data";
import { useLineReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import { SiAccenture, SiGeneralelectric } from "react-icons/si";
import { FaBuildingColumns } from "react-icons/fa6";

const ClientLogo = ({ name }: { name: string }) => {
  const props = { className: "w-8 h-8 md:w-10 md:h-10", title: name };

  if (name === "Accenture") return <SiAccenture {...props} />;
  if (name === "GE Healthcare") return <SiGeneralelectric {...props} />;

  const localSvgs: Record<string, string> = {
    "NatWest": "/clients/natwest.svg",
    "Elevance Health": "/clients/elevance.svg",
    "Symplr": "/clients/symplr.svg",
    "L&T Technology Services": "/clients/ltts.svg",
    "RRD Communications": "/clients/rrd.svg",
  };

  const svgPath = localSvgs[name];

  if (svgPath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={svgPath}
        alt={`${name} logo`}
        title={name}
        className="invert-in-dark h-7 md:h-9 w-auto max-w-[120px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    );
  }

  if (name === "Inversis") {
    return (
      <div className="text-xl md:text-2xl font-bold tracking-tight text-gray-400 hover:text-blue-600 transition-colors duration-300 select-none">
        inversis
      </div>
    );
  }

  if (name === "LSC Communications") {
    return (
      <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors duration-300 select-none">
        <span className="text-xl md:text-2xl font-black tracking-tighter">LSC</span>
      </div>
    );
  }

  // Fallback to generic icons if all else fails
  return <FaBuildingColumns {...props} />;
};

export default function Summary() {
  const textRef = useLineReveal<HTMLDivElement>({
    duration: 0.7,
    stagger: 0.12,
  });

  return (
    <section id="summary" className="py-24 px-6" aria-label="Professional Summary">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Professional Summary" number="01" />

        <div className="max-w-3xl">
          <div
            ref={textRef}
            className="text-lg md:text-xl leading-relaxed text-gray-600 border-l-2 border-blue-600 pl-8"
          >
            {resumeData.personal.summary}
          </div>

          {/* Client Logos */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-6">
              Trusted by teams at
            </p>
            <div className="-mx-6">
              <InfiniteMarquee speed={30}>
                {resumeData.clients.map((client) => (
                  <div
                    key={client}
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-300 flex items-center justify-center"
                  >
                    <ClientLogo name={client} />
                  </div>
                ))}
              </InfiniteMarquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
