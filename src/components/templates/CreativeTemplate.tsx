import type { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export function CreativeTemplate({ data }: Props) {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="text-[11px] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex gap-4">
        {/* Left sidebar */}
        <div className="w-[35%] shrink-0 rounded-lg bg-slate-800 p-4 text-white">
          <div className="mb-4">
            <h1 className="text-xl font-bold leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.summary && (
              <p className="mt-2 text-[10px] leading-relaxed text-slate-300">{personalInfo.summary}</p>
            )}
          </div>

          {/* Contact */}
          <div className="mb-4">
            <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">Contact</h2>
            <div className="space-y-1 text-[10px] text-slate-300">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
              {personalInfo.website && <div>{personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-4">
              <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map(s => (
                  <span key={s} className="rounded bg-slate-700 px-1.5 py-0.5 text-[9px] text-slate-200">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <div className="font-semibold text-white">{edu.school}</div>
                  <div className="text-[9px] text-slate-300">{edu.degree} {edu.field}</div>
                  <div className="text-[9px] text-slate-400">{edu.startDate} – {edu.endDate}</div>
                  {edu.gpa && <div className="text-[9px] text-slate-400">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right content */}
        <div className="flex-1 py-1">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-4">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-800">
                <span className="border-b-2 border-amber-400 pb-0.5">Experience</span>
              </h2>
              {experience.map(exp => (
                <div key={exp.id} className="mb-3">
                  <div className="font-bold text-slate-900">{exp.position}</div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-medium text-amber-700">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</span>
                    <span className="text-[9px] text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <ul className="mt-1 space-y-0.5 pl-3 text-slate-700">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="relative pl-2 before:absolute before:left-0 before:text-amber-400 before:content-['▸']">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-800">
                <span className="border-b-2 border-amber-400 pb-0.5">Projects</span>
              </h2>
              {projects.map(proj => (
                <div key={proj.id} className="mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.link && <span className="text-[9px] text-amber-700">{proj.link}</span>}
                  </div>
                  <div className="text-[10px] text-slate-500">{proj.technologies}</div>
                  {proj.description && <div className="mt-0.5 text-[10px] text-slate-600">{proj.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
