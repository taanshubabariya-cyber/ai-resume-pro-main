import type { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export function ModernTemplate({ data }: Props) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="font-sans text-[11px] leading-relaxed text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="mb-4 border-b-2 border-gray-800 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-3">
          <p className="text-[10.5px] text-gray-700 italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-3">
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-900">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-2">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-gray-900">{exp.position}</span>
                <span className="text-[9px] text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="text-[10px] text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              <ul className="mt-1 space-y-0.5 pl-3">
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <li key={i} className="relative pl-2 before:absolute before:left-0 before:content-['•']">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-900">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-1.5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-gray-900">{edu.school}</span>
                <span className="text-[9px] text-gray-500">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="text-[10px] text-gray-600">{edu.degree} {edu.field}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
              {edu.description && <div className="mt-0.5 text-[10px] text-gray-500">{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-3">
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => (
              <span key={s} className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-3">
          <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-900">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">{proj.name}</span>
                {proj.link && <span className="text-[9px] text-blue-600">{proj.link}</span>}
              </div>
              <div className="text-[10px] text-gray-600">{proj.technologies}</div>
              {proj.description && <div className="mt-0.5 text-[10px] text-gray-500">{proj.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
