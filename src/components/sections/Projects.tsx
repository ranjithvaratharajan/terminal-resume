"use client";

import { resumeData } from "@/lib/resume-data";
import { useScrollReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Projects() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    childSelector: ".project-card",
    stagger: 0.12,
    y: 40,
    duration: 0.7,
  });

  return (
    <section id="projects" className="py-24 px-6" aria-label="Projects">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Projects" number="03" />

        <div ref={gridRef} className="space-y-12">
          {resumeData.projects.map((project) => (
            <article
              key={project.id}
              className="project-card group"
            >
              <div className="border border-gray-100 rounded-sm p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-400 mt-1 inline-block tracking-wider uppercase">
                      {project.isPersonal ? "Personal Project" : "Enterprise"}
                    </span>
                  </div>

                  {/* Links */}
                  {(project.url || project.githubUrl) && (
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 font-medium inline-flex items-center gap-1.5 group/link"
                          aria-label={`View ${project.title} source on GitHub`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          Source
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 font-medium inline-flex items-center gap-1.5"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Case Study Details (if available) */}
                {(project.problem || project.solution || project.impact) && (
                  <div className="grid sm:grid-cols-3 gap-6 mb-6 py-5 border-y border-gray-50">
                    {project.problem && (
                      <div>
                        <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">
                          Challenge
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">
                          Solution
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    )}
                    {project.impact && (
                      <div>
                        <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">
                          Impact
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {project.impact}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-gray-400 bg-gray-50 px-2.5 py-1 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
