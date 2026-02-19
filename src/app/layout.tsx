import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeAI — Build Your Perfect Resume with AI",
  description:
    "Create a professional, ATS-optimized resume in minutes using AI. Land more interviews and get hired faster.",
  keywords: "resume builder, AI resume, ATS resume, CV builder, job application",
  openGraph: {
    title: "ResumeAI — Build Your Perfect Resume with AI",
    description: "Create a professional, ATS-optimized resume in minutes using AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
