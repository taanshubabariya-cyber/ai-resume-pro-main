export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}

export type TemplateType = 'modern' | 'classic' | 'creative';

export const EMPTY_RESUME: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

export const SAMPLE_RESUME: ResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Full-stack software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
  },
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
      gpa: '3.8',
      description: 'Relevant coursework: Data Structures, Algorithms, Machine Learning, Distributed Systems',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      bullets: [
        'Developed and maintained responsive web applications using React, delivering pixel-perfect UI components',
        'Designed and implemented intuitive user interfaces with modern CSS frameworks, improving user engagement by 25%',
        'Integrated RESTful APIs and third-party services, enabling seamless data flow across frontend and backend systems',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      location: 'Remote',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      current: false,
      bullets: [
        'Built a real-time collaboration platform using React, Node.js, and WebSockets',
        'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
        'Designed RESTful APIs consumed by web and mobile clients with 99.9% uptime',
      ],
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Redis', 'Git'],
  projects: [
    {
      id: '1',
      name: 'Open Source CLI Tool',
      description: 'Built a command-line tool for automated code documentation with 500+ GitHub stars',
      technologies: 'TypeScript, Node.js, OpenAI API',
      link: 'github.com/alexj/docgen',
    },
  ],
};
