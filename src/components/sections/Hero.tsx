import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-indigo-700 text-sm font-medium">AI-Powered Resume Builder</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            Land Your Dream Job{" "}
            <span className="gradient-text">10x Faster</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our AI writes, optimizes, and tailors your resume for every job application.
            Beat ATS filters and get more interviews — guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/builder"
              className="gradient-bg text-white font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all shadow-lg shadow-indigo-200"
            >
              Build My Resume — Free ✨
            </Link>
            <Link
              href="#demo"
              className="bg-white text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all"
            >
              ▶ Watch Demo
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-indigo-400", "bg-purple-400", "bg-pink-400", "bg-blue-400", "bg-green-400"].map((color, i) => (
                  <div key={i} className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span><strong className="text-slate-700">50,000+</strong> resumes created</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1"><strong className="text-slate-700">4.9/5</strong> rating</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        {/* Hero Image / Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center border border-slate-200">
                resumeai.app/builder
              </div>
            </div>
            {/* App preview */}
            <div className="grid grid-cols-2 min-h-64 bg-slate-50">
              {/* Left: Form */}
              <div className="p-6 border-r border-slate-100 bg-white">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Your Information</div>
                <div className="space-y-3">
                  {["Full Name", "Job Title", "Work Experience", "Skills"].map((field) => (
                    <div key={field}>
                      <div className="text-xs text-slate-500 mb-1">{field}</div>
                      <div className="h-8 bg-slate-100 rounded-lg animate-pulse" />
                    </div>
                  ))}
                  <button className="w-full gradient-bg text-white text-sm font-semibold py-2 rounded-lg mt-2">
                    ✨ Generate with AI
                  </button>
                </div>
              </div>
              {/* Right: Preview */}
              <div className="p-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Live Preview</div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 space-y-2">
                  <div className="h-4 bg-indigo-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="border-t border-slate-100 pt-2 mt-2 space-y-1">
                    <div className="h-2 bg-slate-100 rounded" />
                    <div className="h-2 bg-slate-100 rounded w-5/6" />
                    <div className="h-2 bg-slate-100 rounded w-4/6" />
                  </div>
                  <div className="border-t border-slate-100 pt-2 space-y-1">
                    <div className="h-2 bg-slate-100 rounded w-3/4" />
                    <div className="h-2 bg-slate-100 rounded" />
                    <div className="h-2 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -left-6 top-1/3 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700">ATS Score</div>
              <div className="text-lg font-bold text-green-600">98%</div>
            </div>
          </div>
          <div className="absolute -right-6 bottom-1/3 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700">Generated in</div>
              <div className="text-lg font-bold text-indigo-600">30 sec</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
