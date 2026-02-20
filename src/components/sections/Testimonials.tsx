const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "SC",
    avatarColor: "bg-indigo-500",
    content:
      "I applied to 12 companies and got 9 interviews. CraftCV's ATS optimization is insane — my old resume was getting filtered out everywhere.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager at Stripe",
    avatar: "MJ",
    avatarColor: "bg-purple-500",
    content:
      "Went from 0 callbacks to 3 offers in 6 weeks. The AI tailoring feature saved me hours — it rewrites my resume for each job in seconds.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Data Scientist at Meta",
    avatar: "PP",
    avatarColor: "bg-pink-500",
    content:
      "As a career changer, I had no idea how to present my skills. CraftCV helped me translate my background into tech language that recruiters love.",
    rating: 5,
  },
  {
    name: "James Williams",
    role: "UX Designer at Airbnb",
    avatar: "JW",
    avatarColor: "bg-blue-500",
    content:
      "The templates are gorgeous and the AI suggestions are spot-on. I landed my dream job at Airbnb after just 2 weeks of using CraftCV.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director at HubSpot",
    avatar: "ER",
    avatarColor: "bg-green-500",
    content:
      "I've recommended CraftCV to my entire team. The cover letter builder alone is worth the subscription — it writes better than I do!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Finance Analyst at Goldman Sachs",
    avatar: "DK",
    avatarColor: "bg-orange-500",
    content:
      "Competitive finance roles require perfect resumes. CraftCV helped me craft a resume that stood out in a pool of 500+ applicants.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4">
            <span className="text-slate-600 text-sm font-medium">Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Real people,{" "}
            <span className="gradient-text">real results</span>
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of professionals who landed their dream jobs with CraftCV.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
