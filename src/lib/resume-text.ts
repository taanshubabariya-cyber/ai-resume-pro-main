import type { ResumeData } from '@/types/resume';

export function resumeToText(data: ResumeData): string {
  const { personalInfo: p, education, experience, skills, projects } = data;
  const parts: string[] = [];

  parts.push(`${p.fullName}\n${[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).join(' | ')}`);
  if (p.summary) parts.push(`SUMMARY\n${p.summary}`);

  if (experience.length) {
    parts.push('EXPERIENCE');
    experience.forEach(e => {
      parts.push(
        `${e.position} — ${e.company} (${e.location}) | ${e.startDate} – ${e.current ? 'Present' : e.endDate}\n` +
          e.bullets.filter(Boolean).map(b => `• ${b}`).join('\n'),
      );
    });
  }

  if (education.length) {
    parts.push('EDUCATION');
    education.forEach(e => {
      parts.push(`${e.degree} in ${e.field}, ${e.school} (${e.startDate} – ${e.endDate})${e.gpa ? `, GPA ${e.gpa}` : ''}${e.description ? `\n${e.description}` : ''}`);
    });
  }

  if (skills.length) parts.push(`SKILLS\n${skills.join(', ')}`);

  if (projects.length) {
    parts.push('PROJECTS');
    projects.forEach(pr => {
      parts.push(`${pr.name}${pr.technologies ? ` (${pr.technologies})` : ''}${pr.link ? ` — ${pr.link}` : ''}\n${pr.description}`);
    });
  }

  return parts.join('\n\n');
}
