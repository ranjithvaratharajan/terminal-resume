"use client";

import { resumeData } from "@/lib/resume-data";
import { useScrollReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import { 
  SiAngular, SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss, SiSass, SiReactivex, SiTailwindcss,
  SiDotnet, SiNodedotjs, SiPython, SiJasmine,
  SiGit, SiGithubactions, SiThreedotjs, SiWebgl, SiMermaid
} from "react-icons/si";
import { 
  FaBrain, FaRobot, FaWandMagicSparkles, FaNetworkWired, FaVial, FaVials, FaFlask,
  FaDatabase, FaChartBar, FaMagnifyingGlassChart, FaFileInvoice, FaCubes, FaPuzzlePiece,
  FaServer, FaCodeBranch, FaUsersGear, FaInfinity
} from "react-icons/fa6";
import { TbBrandCSharp, TbBrandVscode } from "react-icons/tb";
import { VscAzureDevops } from "react-icons/vsc";

const SkillLogo = ({ name }: { name: string }) => {
  const props = { className: "w-6 h-6", title: name };
  switch (name) {
    // Frontend
    case "Angular (v2–21)": return <SiAngular {...props} />;
    case "React": return <SiReact {...props} />;
    case "TypeScript": return <SiTypescript {...props} />;
    case "JavaScript (ES6+)": return <SiJavascript {...props} />;
    case "HTML5": return <SiHtml5 {...props} />;
    case "CSS3": return <SiCss {...props} />;
    case "SASS/SCSS": return <SiSass {...props} />;
    case "RxJS": return <SiReactivex {...props} />;
    case "Tailwind CSS": return <SiTailwindcss {...props} />;
    
    // Backend
    case "C#": return <TbBrandCSharp {...props} />;
    case "ASP.NET MVC":
    case "ASP.NET Web API":
    case "ASP.NET Web Forms": return <SiDotnet {...props} />;
    case "Node.js": return <SiNodedotjs {...props} />;
    case "Python": return <SiPython {...props} />;
    
    // AI & Automation
    case "Agentic AI": return <FaBrain {...props} />;
    case "Prompt Engineering": return <FaWandMagicSparkles {...props} />;
    case "LLM Orchestration": return <FaNetworkWired {...props} />;
    case "Generative AI": return <FaRobot {...props} />;
    case "AI Workflow Automation": return <FaCubes {...props} />;
    
    // Testing & Quality
    case "Jasmine": return <SiJasmine {...props} />;
    case "Karma": return <FaVial {...props} />;
    case "Test-Driven Development (TDD)": return <FaFlask {...props} />;
    case "Unit Testing": return <FaVials {...props} />;
    case "E2E Testing": return <FaVial {...props} />;
    
    // Data & Databases
    case "SQL Server": return <FaDatabase {...props} />;
    case "SSIS": return <FaDatabase {...props} />;
    case "SSRS": return <FaChartBar {...props} />;
    case "Data Mining": return <FaMagnifyingGlassChart {...props} />;
    case "Report Generation": return <FaFileInvoice {...props} />;
    
    // Architecture & Practices
    case "SOLID Principles": return <FaPuzzlePiece {...props} />;
    case "Design Patterns": return <FaCubes {...props} />;
    case "Microservices": return <FaServer {...props} />;
    case "REST API Design": return <FaCodeBranch {...props} />;
    case "Agile/Scrum": return <FaUsersGear {...props} />;
    case "CI/CD": return <FaInfinity {...props} />;
    
    // Tools & Platforms
    case "Git": return <SiGit {...props} />;
    case "GitHub Actions": return <SiGithubactions {...props} />;
    case "VS Code": return <TbBrandVscode {...props} />;
    case "Azure DevOps": return <VscAzureDevops {...props} />;
    case "Three.js": return <SiThreedotjs {...props} />;
    case "WebGL": return <SiWebgl {...props} />;
    case "Mermaid.js": return <SiMermaid {...props} />;
    
    default: return <FaCodeBranch {...props} />;
  }
};

export default function Skills() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    childSelector: ".skill-group",
    stagger: 0.1,
    y: 30,
    duration: 0.6,
  });

  return (
    <section id="skills" className="py-24 px-6 bg-gray-50/50" aria-label="Technical Skills">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Skills" number="04" />

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {resumeData.skills.map((group) => (
            <div key={group.category} className="skill-group">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-400 hover:text-gray-900 transition-colors duration-200 cursor-help"
                  >
                    <SkillLogo name={skill} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
