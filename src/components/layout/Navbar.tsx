"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl text-slate-900">
              Resume<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">
              Reviews
            </Link>
            <Link href="/builder" className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium">
              Builder
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/builder"
              className="gradient-bg text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            <Link href="#features" className="block text-slate-600 hover:text-indigo-600 py-2 text-sm font-medium">Features</Link>
            <Link href="#pricing" className="block text-slate-600 hover:text-indigo-600 py-2 text-sm font-medium">Pricing</Link>
            <Link href="#testimonials" className="block text-slate-600 hover:text-indigo-600 py-2 text-sm font-medium">Reviews</Link>
            <Link href="/builder" className="block gradient-bg text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mt-2">
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
