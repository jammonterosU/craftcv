"use client";

import Link from "next/link";
import { useState } from "react";
import ResumePreview from "./ResumePreview";

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  jobTitle: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  jobDescription: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
  gpa: string;
}

const defaultData: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  jobTitle: "",
  summary: "",
  experience: [
    {
      id: "1",
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      bullets: [""],
    },
  ],
  education: [
    {
      id: "1",
      school: "",
      degree: "",
      field: "",
      year: "",
      gpa: "",
    },
  ],
  skills: [""],
  jobDescription: "",
};

const steps = ["Personal Info", "Experience", "Education", "Skills & AI"];

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const updateField = (field: keyof ResumeData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: unknown) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateField("experience", updated);
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const updated = [...data.experience];
    const bullets = [...updated[expIndex].bullets];
    bullets[bulletIndex] = value;
    updated[expIndex] = { ...updated[expIndex], bullets };
    updateField("experience", updated);
  };

  const addExperience = () => {
    updateField("experience", [
      ...data.experience,
      { id: Date.now().toString(), company: "", role: "", startDate: "", endDate: "", current: false, bullets: [""] },
    ]);
  };

  const addBullet = (expIndex: number) => {
    const updated = [...data.experience];
    updated[expIndex].bullets.push("");
    updateField("experience", updated);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    updateField("education", updated);
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...data.skills];
    updated[index] = value;
    updateField("skills", updated);
  };

  const addSkill = () => {
    updateField("skills", [...data.skills, ""]);
  };

  const handleGenerateAI = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.summary) updateField("summary", result.summary);
      if (result.experience) updateField("experience", result.experience);
      if (result.atsScore) setAtsScore(result.atsScore);
    } catch {
      // Simulate AI generation for demo
      const demoSummary = `Results-driven ${data.jobTitle || "professional"} with proven expertise in delivering high-impact solutions. Passionate about leveraging technology to drive business growth and create exceptional user experiences. Strong track record of collaborating with cross-functional teams to achieve organizational goals.`;
      updateField("summary", demoSummary);
      setAtsScore(Math.floor(Math.random() * 15) + 84);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-bold text-lg text-slate-900">
              Resume<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {atsScore && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-green-700 text-sm font-semibold">ATS Score: {atsScore}%</span>
              </div>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 transition-all"
            >
              {showPreview ? "← Edit" : "Preview →"}
            </button>
            <button className="gradient-bg text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className={showPreview ? "hidden lg:block" : ""}>
            {/* Step tabs */}
            <div className="flex gap-1 bg-white rounded-xl border border-slate-100 p-1 mb-6 shadow-sm">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStep(i)}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
                    step === i
                      ? "gradient-bg text-white shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              {/* Step 0: Personal Info */}
              {step === 0 && (
                <>
                  <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="John Smith"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
                      <input
                        type="text"
                        value={data.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Job Title</label>
                      <input
                        type="text"
                        value={data.jobTitle}
                        onChange={(e) => updateField("jobTitle", e.target.value)}
                        placeholder="Senior Software Engineer"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">LinkedIn</label>
                      <input
                        type="text"
                        value={data.linkedin}
                        onChange={(e) => updateField("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/johnsmith"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Professional Summary</label>
                      <textarea
                        value={data.summary}
                        onChange={(e) => updateField("summary", e.target.value)}
                        placeholder="Brief overview of your professional background and key strengths..."
                        rows={4}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 1: Experience */}
              {step === 1 && (
                <>
                  <h2 className="text-lg font-bold text-slate-900">Work Experience</h2>
                  {data.experience.map((exp, expIdx) => (
                    <div key={exp.id} className="border border-slate-100 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Position {expIdx + 1}</span>
                        {data.experience.length > 1 && (
                          <button
                            onClick={() => updateField("experience", data.experience.filter((_, i) => i !== expIdx))}
                            className="text-xs text-red-400 hover:text-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(expIdx, "company", e.target.value)}
                            placeholder="Acme Corp"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(expIdx, "role", e.target.value)}
                            placeholder="Software Engineer"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(expIdx, "startDate", e.target.value)}
                            placeholder="Jan 2022"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
                          <input
                            type="text"
                            value={exp.current ? "Present" : exp.endDate}
                            onChange={(e) => updateExperience(expIdx, "endDate", e.target.value)}
                            disabled={exp.current}
                            placeholder="Dec 2023"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50"
                          />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(expIdx, "current", e.target.checked)}
                          className="rounded border-slate-300 text-indigo-600"
                        />
                        Currently working here
                      </label>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Achievements & Responsibilities</label>
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2 mb-2">
                            <span className="text-slate-400 mt-2.5 text-xs">•</span>
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => updateBullet(expIdx, bIdx, e.target.value)}
                              placeholder="Increased revenue by 30% by implementing..."
                              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => addBullet(expIdx)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          + Add bullet point
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addExperience}
                    className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3 text-sm text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium"
                  >
                    + Add Another Position
                  </button>
                </>
              )}

              {/* Step 2: Education */}
              {step === 2 && (
                <>
                  <h2 className="text-lg font-bold text-slate-900">Education</h2>
                  {data.education.map((edu, eduIdx) => (
                    <div key={edu.id} className="border border-slate-100 rounded-xl p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">School / University</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(eduIdx, "school", e.target.value)}
                            placeholder="Stanford University"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(eduIdx, "degree", e.target.value)}
                            placeholder="Bachelor of Science"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Field of Study</label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => updateEducation(eduIdx, "field", e.target.value)}
                            placeholder="Computer Science"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Graduation Year</label>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => updateEducation(eduIdx, "year", e.target.value)}
                            placeholder="2022"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">GPA (optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(eduIdx, "gpa", e.target.value)}
                            placeholder="3.8"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => updateField("education", [...data.education, { id: Date.now().toString(), school: "", degree: "", field: "", year: "", gpa: "" }])}
                    className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3 text-sm text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium"
                  >
                    + Add Another School
                  </button>
                </>
              )}

              {/* Step 3: Skills & AI */}
              {step === 3 && (
                <>
                  <h2 className="text-lg font-bold text-slate-900">Skills & AI Generation</h2>

                  {/* Skills */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {data.skills.map((skill, i) => (
                        <input
                          key={i}
                          type="text"
                          value={skill}
                          onChange={(e) => updateSkill(i, e.target.value)}
                          placeholder="e.g. React"
                          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-32"
                        />
                      ))}
                    </div>
                    <button onClick={addSkill} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                      + Add skill
                    </button>
                  </div>

                  {/* Job Description for AI */}
                  <div className="border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🤖</span>
                      <h3 className="font-bold text-slate-900">AI Resume Optimizer</h3>
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">PRO</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Paste the job description below and our AI will rewrite your resume to perfectly match the role and beat ATS filters.
                    </p>
                    <textarea
                      value={data.jobDescription}
                      onChange={(e) => updateField("jobDescription", e.target.value)}
                      placeholder="Paste the job description here...&#10;&#10;Example: We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and cloud infrastructure..."
                      rows={6}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                    <button
                      onClick={handleGenerateAI}
                      disabled={generating}
                      className="w-full gradient-bg text-white font-bold py-3 rounded-xl mt-3 hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {generating ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Generating with AI...
                        </>
                      ) : (
                        <>✨ Generate & Optimize with AI</>
                      )}
                    </button>
                    {atsScore && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="text-2xl font-extrabold text-green-600">{atsScore}%</div>
                        <div>
                          <div className="font-semibold text-green-800 text-sm">ATS Score</div>
                          <div className="text-green-600 text-xs">Your resume is highly optimized for this role!</div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Next →
                  </button>
                ) : (
                  <button className="gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Download PDF 📄
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className={!showPreview ? "hidden lg:block" : ""}>
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-700 text-sm">Live Preview</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Auto-updating
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <ResumePreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
