import ResumeBuilder from "@/components/builder/ResumeBuilder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder — CraftCV",
  description: "Build your AI-powered resume in minutes",
};

export default function BuilderPage() {
  return <ResumeBuilder />;
}
