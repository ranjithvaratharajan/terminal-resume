// ─────────────────────────────────────────────────────
// Resume Data — Single source of truth for all content
// ─────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Personal {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  summary: string;
  yearsExperience: number;
  totalCompanies: number;
  totalClients: number;
  totalProjects: number;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  website: string;
  social: SocialLink[];
}

export interface Experience {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  isPersonal: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  id: number;
  startYear: string;
  endYear: string;
  degree: string;
  institution: string;
  grade?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
}

export interface ResumeData {
  personal: Personal;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education[];
  testimonials: Testimonial[];
  clients: string[];
}

const careerStartDate = new Date("2014-12-01");
const dynamicYearsExperience = Math.floor(
  (new Date().getTime() - careerStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
);

export const resumeData: ResumeData = {
  personal: {
    name: "Ranjith Varatharajan",
    firstName: "Ranjith",
    lastName: "Varatharajan",
    title: "Application Development Specialist & Agentic AI Developer",
    tagline: "Architecting Intelligent Autonomous Systems",
    summary:
      `Seasoned Application Development Specialist & Agentic AI Developer with an ${dynamicYearsExperience}-year track record of delivering high-impact software solutions across Fortune 500 enterprises. Specializing in crafting intelligent, autonomous web applications using Angular (v2–21) and LLM orchestration. Experienced in applying SOLID principles and TDD to ensure robust, maintainable code. Proven ability to lead frontend modernization initiatives, mentor engineering teams, and collaborate directly with global clients to drive digital transformation.`,
    yearsExperience: dynamicYearsExperience,
    totalCompanies: 6,
    totalClients: 9,
    totalProjects: 5,
    location: "Coimbatore, India",
    email: "hello[at]varanjith.com",
    phone: "+91 7200004545",
    resumeUrl: "/ranjith-resume.pdf",
    website: "https://varanjith.com",
    social: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/ranjithvaratharajan",
        icon: "linkedin",
      },
      {
        platform: "GitHub",
        url: "https://github.com/ranjithvaratharajan",
        icon: "github",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/varanjith",
        icon: "twitter",
      },
    ],
  },

  experience: [
    {
      id: 1,
      startDate: "Feb 2022",
      endDate: "Present",
      title: "Application Development Specialist",
      company: "Accenture India Pvt. Ltd., Coimbatore",
      description:
        "Lead development and maintenance of enterprise applications using Angular, TypeScript, Node.js, and REST APIs. Work closely with Product Owners, QA, Security, DevOps, and Business stakeholders to deliver scalable and secure solutions.",
      highlights: [
        "Design and develop enterprise-grade Angular applications and reusable frontend architectures",
        "Develop backend APIs and micro-services using Node.js",
        "Implement unit tests, acceptance tests, smoke tests, and Cypress end-to-end automation",
        "Participate in requirement analysis, story estimation, technical design discussions, and architecture reviews",
        "Conduct code reviews and mentor developers on engineering best practices",
        "Provide production support and perform Root Cause Analysis (RCA) for critical incidents",
        "Collaborate across multiple teams to ensure successful delivery of business initiatives",
        "Contributed to enterprise-wide CI/CD template development and developed deployment automation pipelines",
        "Manage deployments across SIT and Production environments hosted on Pivotal Cloud Foundry (PCF)",
        "Serve as HashiCorp Vault administrator for enterprise secrets management and periodic key rotation",
        "Lead vulnerability remediation efforts across Angular applications and Node.js micro-services",
        "Developed automated vulnerability monitoring and notification workflows integrated with CI/CD pipelines",
        "Implement AWS S3 integrations for secure document and file storage and support cloud-native deployments",
      ],
      technologies: [
        "Angular",
        "TypeScript",
        "Node.js",
        "REST APIs",
        "Cypress",
        "PCF",
        "HashiCorp Vault",
        "AWS S3",
        "CI/CD",
        "Agile",
      ],
    },
    {
      id: 2,
      startDate: "Apr 2021",
      endDate: "Feb 2022",
      title: "Technical Lead",
      company: "L&T Technology Services",
      description:
        "Spearheaded the development of engineering solutions using ASP.NET Web Forms, MVC, and Angular.",
      highlights: [
        "Key technical liaison for the Engineering Solutions Team",
        "Resolved critical client escalations and ensured prompt patch delivery",
        "Architected robust frontend components for global clients",
        "Optimized SQL Server queries to improve application performance",
      ],
      technologies: [
        "Angular",
        "ASP.NET MVC",
        "C#",
        "SQL Server",
        "Web API",
      ],
    },
    {
      id: 3,
      startDate: "Sep 2018",
      endDate: "Apr 2021",
      title: "Senior Software Engineer",
      company: "L&T Technology Services",
      description:
        "Played a pivotal role in the full-stack development lifecycle, delivering high-impact features for global clients.",
      highlights: [
        "Full-stack development across the entire lifecycle",
        "Analyzed root causes of recurring issues with Client Support",
        "Implemented systemic fixes enhancing system stability",
        "Improved user satisfaction through performance optimization",
      ],
      technologies: [
        "Angular",
        "C#",
        "ASP.NET",
        "SQL Server",
        "SSIS",
        "SSRS",
      ],
    },
    {
      id: 4,
      startDate: "Oct 2017",
      endDate: "Sep 2018",
      title: "Software Engineer",
      company: "Saggezza India Pvt. Ltd.",
      description:
        "Optimized and maintained a high-traffic e-commerce application, implementing critical bug fixes and feature enhancements.",
      highlights: [
        "Maintained high-traffic e-commerce application",
        "Initiated large-scale data mining project for actionable insights",
        "Leveraged SSIS/SSRS for comprehensive reporting",
        "Drove data-driven decision-making for stakeholders",
      ],
      technologies: ["C#", "ASP.NET", "SSIS", "SSRS", "SQL Server", "Angular"],
    },
    {
      id: 5,
      startDate: "Oct 2016",
      endDate: "Oct 2017",
      title: "Software Engineer",
      company: "Cogwave Software Technologies",
      description:
        "Drove the digital transformation of manual hotel administration processes into efficient web applications.",
      highlights: [
        "Built custom hotel/room reservation workflows and policy engines",
        "Interfaced directly with clients for requirements gathering",
        "Provided on-site training and support for product adoption",
        "Documented custom policies and workflows",
      ],
      technologies: ["C#", "ASP.NET", "SQL Server", "JavaScript", "jQuery"],
    },
    {
      id: 6,
      startDate: "Nov 2014",
      endDate: "Oct 2016",
      title: "Software Developer",
      company: "Sivasakthi Software Services",
      description:
        "Contributed to the development of core software modules, consistently meeting tight deadlines without compromising quality.",
      highlights: [
        "Developed core software modules under tight deadlines",
        "Collaborated with cross-functional teams on large-scale projects",
        "Focused on code maintainability and design standards",
        "Delivered projects with zero quality compromise",
      ],
      technologies: ["C#", "ASP.NET", "SQL Server", "JavaScript"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "FlowMinds",
      description:
        "AI-Powered System Architecture & Logic Flow Visualizer that transforms natural language into complex execution flows and diagrams.",
      problem:
        "Engineers spend hours manually creating system architecture and flow diagrams",
      solution:
        "Built an AI-powered tool that converts natural language descriptions into Mermaid.js diagrams with a polished interface",
      impact: "Reduces architecture documentation time from hours to minutes",
      technologies: [
        "Angular 20",
        "Tailwind CSS v4",
        "Mermaid.js",
        "Generative AI",
      ],
      url: "https://flowminds.varanjith.com/",
      githubUrl: "https://github.com/ranjithvaratharajan/flow-minds/",
      isPersonal: true,
    },
    {
      id: 2,
      title: "Retro Scientific Orrery",
      description:
        "A mathematically accurate solar system simulator calculating planetary positions using Keplerian Orbital Elements and Julian Dates.",
      problem:
        "No accessible, visually engaging tool for real-time planetary position visualization",
      solution:
        "Built a 3D solar system simulator with accurate orbital mechanics and interactive navigation",
      impact:
        "Used as an educational tool with multiple scaling modes for exploration",
      technologies: ["Angular 21", "Three.js", "WebGL", "TypeScript"],
      url: "https://solar.varanjith.com",
      githubUrl: "https://github.com/ranjithvaratharajan/retro-orrery",
      isPersonal: true,
    },
    {
      id: 3,
      title: "Risk Finance Management — NatWest",
      description:
        "A secure user gateway for administrators to manage access permissions with intuitive dashboards for modifying user access rights.",
      technologies: ["Angular", "Node.js", "Web API"],
      isPersonal: false,
    },
    {
      id: 4,
      title: "Healthcare Management — Elevance",
      description:
        "A SaaS solution for healthcare clients featuring a mass update module for contract records, streamlining operational workflows.",
      technologies: ["Angular", "Karma", "Jasmine", "Web API"],
      isPersonal: false,
    },
    {
      id: 5,
      title: "Terminal Resume",
      description:
        "A cyberpunk-inspired, interactive CLI resume featuring cinematic boot sequences, idle protocols, and a multi-theme engine.",
      problem: "Traditional resumes lack interactivity and personality",
      solution:
        "Created a fully interactive terminal-style portfolio with boot sequences, themes, and screensavers",
      impact:
        "Showcases technical creativity and front-end mastery in a memorable format",
      technologies: ["Angular 21", "Terminal.css", "Signals", "RxJS"],
      url: "https://varanjith.com",
      githubUrl:
        "https://github.com/ranjithvaratharajan/terminal-resume",
      isPersonal: true,
    },
  ],

  skills: [
    {
      category: "Frontend",
      skills: [
        "Angular (v2–21)",
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "SASS/SCSS",
        "RxJS",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend",
      skills: [
        "C#",
        "ASP.NET MVC",
        "ASP.NET Web API",
        "ASP.NET Web Forms",
        "Node.js",
        "Python",
      ],
    },
    {
      category: "AI & Automation",
      skills: [
        "Agentic AI",
        "Prompt Engineering",
        "LLM Orchestration",
        "Generative AI",
        "AI Workflow Automation",
      ],
    },
    {
      category: "Testing & Quality",
      skills: [
        "Jasmine",
        "Karma",
        "Test-Driven Development (TDD)",
        "Unit Testing",
        "E2E Testing",
      ],
    },
    {
      category: "Data & Databases",
      skills: [
        "SQL Server",
        "SSIS",
        "SSRS",
        "Data Mining",
        "Report Generation",
      ],
    },
    {
      category: "Architecture & Practices",
      skills: [
        "SOLID Principles",
        "Design Patterns",
        "Microservices",
        "REST API Design",
        "Agile/Scrum",
        "CI/CD",
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        "Git",
        "GitHub Actions",
        "VS Code",
        "Azure DevOps",
        "Three.js",
        "WebGL",
        "Mermaid.js",
      ],
    },
  ],

  education: [
    {
      id: 1,
      startYear: "2009",
      endYear: "2012",
      degree: "Master of Computer Applications (MCA)",
      institution: "Hindusthan College of Engineering and Technologies",
      grade: "9.0 CGPA - Distinction",
    },
    {
      id: 2,
      startYear: "2006",
      endYear: "2009",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "SMS College of Arts and Science",
      grade: "77% - First Class",
    },
    {
      id: 3,
      startYear: "2005",
      endYear: "2006",
      degree: "Higher Secondary Certificate",
      institution: "SN Matriculation Higher Secondary School",
      grade: "79.25% - First Class",
    },
    {
      id: 4,
      startYear: "2003",
      endYear: "2004",
      degree: "Secondary School Leaving Certificate",
      institution: "SN Matriculation Higher Secondary School",
      grade: "74.25% - First Class",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Meganathan Ravindran",
      position: "Technology Delivery Assoc. Lead Manager",
      company: "Accenture",
      quote:
        "Ranjith serves as a senior developer and technical lead for the WPD/CMA MUT Modernization program. His exceptional work includes rewriting the UI screens using Angular tech stack. He has mentored and supported over 4 ASEs in Angular, ensuring timely completion of tasks. Ranjith's dedication and quick learning abilities make him a valuable resource.",
    },
    {
      id: 2,
      name: "Nimel Thomas",
      position: "Technology Delivery Lead Manager",
      company: "Accenture",
      quote:
        "Thank you for your leadership in the sprint 0 space for the frontend and also for helping out the broader team with issues. We have a long ways to go and your leadership will be key for successful delivery.",
    },
    {
      id: 3,
      name: "Joel Branzine Dsouza",
      position: "Packaged App Development Assoc Manager",
      company: "Accenture",
      quote:
        "Your effort for sprint 0 during release 1.2.0, 1.2.1 and 1.2.2 has been exceptional. Your guidance for developers preparing sprint 0 document was very effective which helped us to improve quality of technical documents.",
    },
    {
      id: 4,
      name: "Suguna Bhushan",
      position: "Staff Software Engineer",
      company: "Symplr",
      quote:
        "He is a full stack developer with .NET and UI Skill set. He is always given challenging UI styling work, he has always overcome the challenges and delivered the work on time with quality. As his team lead, I am always confident to take up challenging tasks for the team.",
    },
    {
      id: 5,
      name: "Vijayakumar Palanisamy",
      position: "Supervising Associate",
      company: "EY",
      quote:
        "Quick learner and smart worker. Ready to accept the challenges and deliver it on time. Good team player.",
    },
    {
      id: 6,
      name: "Selvakumar Vadamalai",
      position: "Lead Testing",
      company: "Saggezza",
      quote:
        "I rarely come across real talents who stand out like Ranjith. 'Genuine expert' is the phrase that comes to mind when I think about him.",
    },
    {
      id: 7,
      name: "Gafoor Shaik",
      position: "Staff Software Engineer",
      company: "GE",
      quote:
        "Ranjith is a proactive and self motivated team player with good technical skills. His expertise on front end technologies like Angular and server side technologies helped the team to solve complex issues. He has excellent problem solving skills.",
    },
    {
      id: 8,
      name: "Sarbajit Dash",
      position: "Senior Software Engineer",
      company: "GE",
      quote:
        "Working with Ranjith is a wonderful experience. He is very organized and dedicated. He makes sure he completes tasks on time without compromising any quality. He contributed many ideas out of the box.",
    },
    {
      id: 9,
      name: "Shravil Potdar",
      position: "Software Engineer",
      company: "GE",
      quote:
        "Ranjith is a extra ordinary guy, who always thinks out of the box. His mind blowing ideas have lead our team to Hackathon winners. He always keeps his work environment cool. His skills are amazing. He is a quick learner. He is the guy who never fears difficulties.",
    },
    {
      id: 10,
      name: "Raguventhan",
      position: "Head of IT",
      company: "First Steps",
      quote:
        "The most energetic person I have ever met. He is a quick learner, get complete all the works before deadline.",
    },
    {
      id: 11,
      name: "Prabhakaran Sathasivam",
      position: "Project Manager",
      company: "Sivasakthi Softwares",
      quote:
        "Ranjith was my colleague at Sivasakthi Software. He is sincere, dedicated in his work. I wish him all good luck",
    },
  ],

  clients: [
    "Accenture",
    "NatWest",
    "GE Healthcare",
    "Elevance Health",
    "Symplr",
    "L&T Technology Services",
    "RRD Communications",
    "LSC Communications",
    "Inversis",
  ],
};
