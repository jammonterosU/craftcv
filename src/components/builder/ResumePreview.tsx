import type { ResumeData } from "./ResumeBuilder";

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  const hasContent = data.fullName || data.email || data.jobTitle;

  if (!hasContent) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="text-4xl mb-3">📄</div>
        <p className="text-sm font-medium">Your resume preview will appear here</p>
        <p className="text-xs mt-1">Start filling in your information on the left</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-slate-800 text-sm font-sans" style={{ fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-wide uppercase">
          {data.fullName || "Your Name"}
        </h1>
        {data.jobTitle && (
          <p className="text-indigo-600 font-semibold mt-0.5">{data.jobTitle}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.linkedin && <span>🔗 {data.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.some((e) => e.company || e.role) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
            Work Experience
          </h2>
          {data.experience.map((exp) => (
            (exp.company || exp.role) && (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{exp.role || "Role"}</div>
                    <div className="text-indigo-600 text-xs font-semibold">{exp.company}</div>
                  </div>
                  <div className="text-xs text-slate-500 text-right">
                    {exp.startDate && (
                      <span>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                    )}
                  </div>
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i} className="text-xs text-slate-700 flex gap-2">
                        <span className="text-slate-400 flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.some((e) => e.school) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
            Education
          </h2>
          {data.education.map((edu) => (
            edu.school && (
              <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{edu.school}</div>
                  <div className="text-xs text-slate-600">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ""}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </div>
                </div>
                {edu.year && <div className="text-xs text-slate-500">{edu.year}</div>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.filter(Boolean).length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.filter(Boolean).map((skill, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
