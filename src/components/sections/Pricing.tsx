"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for getting started",
    cta: "Get Started Free",
    ctaHref: "/builder",
    highlighted: false,
    features: [
      "1 resume per month",
      "3 professional templates",
      "Basic ATS check",
      "PDF download",
      "Email support",
    ],
    missing: ["AI writing assistant", "Unlimited resumes", "50+ templates", "Cover letter builder", "LinkedIn optimizer"],
  },
  {
    name: "Pro",
    price: { monthly: 19, yearly: 12 },
    description: "For serious job seekers",
    cta: "Start Pro — 7 Days Free",
    ctaHref: "/checkout?plan=pro",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited resumes",
      "50+ premium templates",
      "AI writing assistant",
      "Advanced ATS optimization",
      "Cover letter builder",
      "PDF & Word download",
      "Priority support",
    ],
    missing: ["LinkedIn optimizer", "Team collaboration"],
  },
  {
    name: "Enterprise",
    price: { monthly: 49, yearly: 35 },
    description: "For teams & recruiters",
    cta: "Contact Sales",
    ctaHref: "/contact",
    highlighted: false,
    features: [
      "Everything in Pro",
      "LinkedIn profile optimizer",
      "Team collaboration (5 seats)",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    missing: [],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-4">
            <span className="text-indigo-700 text-sm font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Invest in your{" "}
            <span className="gradient-text">career</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Start free. Upgrade when you need more power. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                !yearly ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Yearly
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                Save 40%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 relative ${
                plan.highlighted
                  ? "border-indigo-500 shadow-2xl shadow-indigo-100 scale-105"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-slate-900">
                    ${yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-slate-500 mb-2">/mo</span>
                  )}
                </div>
                {yearly && plan.price.monthly > 0 && (
                  <p className="text-sm text-slate-400 mt-1">
                    Billed ${(plan.price.yearly * 12).toFixed(0)}/year
                  </p>
                )}
              </div>

              <Link
                href={plan.ctaHref}
                className={`block w-full text-center font-bold py-3 rounded-xl mb-8 transition-all ${
                  plan.highlighted
                    ? "gradient-bg text-white hover:opacity-90 shadow-lg shadow-indigo-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
                {plan.missing.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 opacity-40">
                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-500">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-6 py-4">
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <div className="font-bold text-slate-900 text-sm">30-Day Money-Back Guarantee</div>
              <div className="text-slate-500 text-xs">Not satisfied? Get a full refund, no questions asked.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
