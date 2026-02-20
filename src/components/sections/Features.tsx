const features = [
  {
    icon: "🤖",
    title: "AI-Powered Writing",
    description:
      "Our AI analyzes job descriptions and writes tailored bullet points that highlight your most relevant experience.",
    color: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-100",
  },
  {
    icon: "🎯",
    title: "ATS Optimization",
    description:
      "Beat applicant tracking systems with keyword optimization. We scan job postings and ensure your resume passes every filter.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: "⚡",
    title: "30-Second Generation",
    description:
      "Fill in your details, paste the job description, and get a complete, polished resume in under 30 seconds.",
    color: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100",
  },
  {
    icon: "📄",
    title: "Professional Templates",
    description:
      "Choose from 50+ recruiter-approved templates designed for every industry — tech, finance, healthcare, and more.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🔄",
    title: "One-Click Tailoring",
    description:
      "Apply to multiple jobs? Instantly create tailored versions of your resume for each position with one click.",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
  },
  {
    icon: "📊",
    title: "Resume Score & Tips",
    description:
      "Get an instant score and actionable tips to improve your resume. Know exactly what recruiters are looking for.",
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4">
            <span className="text-slate-600 text-sm font-medium">Why CraftCV?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Everything you need to{" "}
            <span className="gradient-text">get hired</span>
          </h2>
          <p className="text-lg text-slate-600">
            Stop spending hours on your resume. Our AI does the heavy lifting so you can focus on what matters — preparing for interviews.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`card-hover rounded-2xl border p-6 ${feature.color}`}
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Resumes Created" },
              { value: "3x", label: "More Interviews" },
              { value: "98%", label: "ATS Pass Rate" },
              { value: "30s", label: "Average Build Time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
