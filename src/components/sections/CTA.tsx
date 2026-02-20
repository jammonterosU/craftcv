import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="gradient-bg rounded-3xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />
          </div>

          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Ready to land your dream job?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Join 50,000+ professionals who built their perfect resume with CraftCV.
              Start free — no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/builder"
                className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Build My Resume — Free ✨
              </Link>
              <Link
                href="#pricing"
                className="bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/30 transition-colors border border-white/30"
              >
                View Pricing
              </Link>
            </div>

            <p className="text-indigo-200 text-sm mt-6">
              ✓ Free forever plan &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
