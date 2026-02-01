export interface Client {
    id: number;
    name: string;
    logoAscii: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    url: string;
    githubUrl?: string;
}

export interface Resume {
    about: About;
    skills: Skill[];
    experience: Experience[];
    education: Education[];
    testimonials: Testimonial[];
    clients: Client[];
    projects: Project[];
    newsItems: string[];
    contact: Contact;
}

export interface About {
    name: string;
    title: string;
    tagline: string;
    summary: string;
    profile_image_url?: string;
    cv_file_url?: string;
}

export interface Experience {
    id: number;
    startDate: string;
    endDate: string;
    title: string;
    company: string;
    description: string | string[]; // Can be string (from new API) or string[] (old model)
}

export interface Skill {
    id: number;
    title: string;
    percentage: number;
}

export interface Contact {
    email: string;
    phone?: string;
    location?: string;
    social: SocialLink[];
}

export interface SocialLink {
    platform: string;
    url: string;
    class: string;
}

export interface Education {
    id: number;
    startYear: string;
    endYear: string;
    title: string;
    name: string;
    percentage?: string;
    class?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    position: string;
    image: string;
    comments: string;
}
