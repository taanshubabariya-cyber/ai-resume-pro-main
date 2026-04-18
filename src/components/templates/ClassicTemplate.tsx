import type { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export function ClassicTemplate({ data }: Props) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="font-serif text-[11px] leading-relaxed text-gray-800" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Header - centered classic style */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="mt-1 text-[10px] text-gray-600">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean)
            .join(' | ')}
        </div>
        <div className="mt-2 h-px bg-gray-300" />
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-4">
          <h2 className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-gray-700">Professional Summary</h2>
          <p className="text-center text-[10.5px] text-gray-600">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="mb-2 border-b border-gray-300 pb-0.5 text-xs font-bold uppercase tracking-widest text-gray-700">Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-2.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-gray-900">{exp.position}</span>
                  <span className="text-gray-600"> — {exp.company}</span>
                </div>
                <span className="text-[9px] italic text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.location && <div className="text-[10px] italic text-gray-500">{exp.location}</div>}
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-gray-700">
                {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="mb-2 border-b border-gray-300 pb-0.5 text-xs font-bold uppercase tracking-widest text-gray-700">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-1.5">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-gray-900">{edu.school}</span>
                <span className="text-[9px] italic text-gray-500">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="text-[10px] text-gray-600">{edu.degree} in {edu.field}{edu.gpa ? `, GPA: ${edu.gpa}` : ''}</div>
              {edu.description && <div className="mt-0.5 text-[10px] text-gray-500">{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="mb-2 border-b border-gray-300 pb-0.5 text-xs font-bold uppercase tracking-widest text-gray-700">Skills</h2>
          <p className="text-[10.5px] text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="mb-2 border-b border-gray-300 pb-0.5 text-xs font-bold uppercase tracking-widest text-gray-700">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-1.5">
              <span className="font-bold text-gray-900">{proj.name}</span>
              {proj.technologies && <span className="text-[10px] text-gray-500"> ({proj.technologies})</span>}
              {proj.link && <span className="ml-1 text-[9px] text-blue-700">[{proj.link}]</span>}
              {proj.description && <div className="text-[10px] text-gray-600">{proj.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
