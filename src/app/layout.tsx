import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { resumeData } from "@/lib/resume-data";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const { personal } = resumeData;

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.title}`,
  description: personal.summary,
  keywords: [
    "Ranjith Varatharajan",
    "Application Development Specialist",
    "Agentic AI Developer",
    "Angular Developer",
    "Full Stack Developer",
    "Frontend Engineer",
    "Software Engineer",
    "TypeScript",
    "React",
    "LLM Orchestration",
    personal.location,
  ],
  authors: [{ name: personal.name, url: personal.website }],
  creator: personal.name,
  metadataBase: new URL(personal.website),
  openGraph: {
    title: `${personal.name} — ${personal.title}`,
    description: personal.summary,
    url: personal.website,
    siteName: personal.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.title}`,
    description: personal.tagline,
    creator: "@ranjithvaratharajan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: personal.website,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: "Application Development Specialist & Agentic AI Developer",
  url: personal.website,
  email: `mailto:${personal.email}`,
  telephone: personal.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressCountry: "IN",
  },
  sameAs: personal.social.map((s) => s.url),
  knowsAbout: [
    "Angular",
    "TypeScript",
    "React",
    "Agentic AI",
    "LLM Orchestration",
    "ASP.NET",
    "C#",
    "Full Stack Development",
    "Frontend Architecture",
    "SOLID Principles",
    "Test-Driven Development",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Accenture",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Hindusthan College of Engineering and Technologies",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
