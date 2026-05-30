import { resumeData } from "@/lib/resume-data";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { personal } = resumeData;

  return (
    <footer
      className="py-12 px-6 border-t border-gray-100"
      role="contentinfo"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} {personal.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {personal.social.map((link) => {
            const Icon = link.platform.toLowerCase() === 'linkedin' ? FaLinkedin : 
                         link.platform.toLowerCase() === 'github' ? FaGithub : 
                         FaXTwitter;
            const label = link.platform.toLowerCase() === 'twitter' ? 'X' : link.platform;
            
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                aria-label={`${link.platform} profile`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
