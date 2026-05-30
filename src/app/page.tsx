import { resumeData } from "@/lib/resume-data";
import ClientPage from "@/components/ClientPage";

export default function Home() {
  const { personal } = resumeData;

  return (
    <>
      {/* SSR-rendered semantic content for ATS / crawlers / noscript */}
      <noscript>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1>{personal.name}</h1>
          <p>{personal.title}</p>
          <p>{personal.summary}</p>
          <h2>Experience</h2>
          {resumeData.experience.map((job) => (
            <div key={job.id}>
              <h3>
                {job.title} — {job.company}
              </h3>
              <p>
                {job.startDate} – {job.endDate}
              </p>
              <p>{job.description}</p>
            </div>
          ))}
          <h2>Skills</h2>
          {resumeData.skills.map((group) => (
            <div key={group.category}>
              <h3>{group.category}</h3>
              <p>{group.skills.join(", ")}</p>
            </div>
          ))}
          <h2>Education</h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id}>
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <p>
                {edu.startYear} – {edu.endYear}
              </p>
            </div>
          ))}
          <h2>Contact</h2>
          <p>Email: {personal.email}</p>
          <p>Phone: {personal.phone}</p>
          <p>Location: {personal.location}</p>
        </div>
      </noscript>

      {/* Interactive version */}
      <ClientPage />
    </>
  );
}
