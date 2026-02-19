import { NextRequest, NextResponse } from "next/server";
import type { ResumeData } from "@/components/builder/ResumeBuilder";

// AI Resume Generation API
// In production: integrate with OpenAI GPT-4 or Anthropic Claude
// For demo: returns intelligently crafted content based on user input

function generateSummary(data: ResumeData): string {
  const title = data.jobTitle || "professional";
  const skills = data.skills.filter(Boolean).slice(0, 3).join(", ");
  const hasExperience = data.experience.some((e) => e.company);

  const summaries = [
    `Results-driven ${title} with a proven track record of delivering high-impact solutions${skills ? ` in ${skills}` : ""}. Passionate about leveraging cutting-edge technology to drive business growth and create exceptional user experiences. Strong collaborator with excellent communication skills and a data-driven approach to problem-solving.`,
    `Dynamic ${title} combining technical expertise${skills ? ` in ${skills}` : ""} with strong business acumen. ${hasExperience ? "Demonstrated success in leading cross-functional initiatives and delivering measurable results." : "Eager to apply academic knowledge and fresh perspectives to real-world challenges."} Known for innovative thinking and ability to thrive in fast-paced environments.`,
    `Accomplished ${title} with deep expertise${skills ? ` in ${skills}` : ""} and a passion for building scalable, user-centric solutions. Track record of exceeding targets and driving organizational success through strategic thinking and hands-on execution. Committed to continuous learning and staying ahead of industry trends.`,
  ];

  return summaries[Math.floor(Math.random() * summaries.length)];
}

function enhanceBullets(bullets: string[], role: string): string[] {
  const actionVerbs = [
    "Spearheaded", "Architected", "Optimized", "Delivered", "Increased",
    "Reduced", "Implemented", "Collaborated", "Designed", "Launched",
    "Streamlined", "Developed", "Led", "Managed", "Transformed",
  ];

  return bullets.map((bullet) => {
    if (!bullet.trim()) return bullet;
    // If bullet doesn't start with a strong action verb, enhance it
    const startsWithVerb = actionVerbs.some((v) =>
      bullet.toLowerCase().startsWith(v.toLowerCase())
    );
    if (!startsWithVerb && bullet.length > 5) {
      const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      return `${verb} ${bullet.charAt(0).toLowerCase()}${bullet.slice(1)}`;
    }
    return bullet;
  });
}

function calculateAtsScore(data: ResumeData): number {
  let score = 60; // Base score

  // Has contact info
  if (data.email) score += 5;
  if (data.phone) score += 3;
  if (data.location) score += 2;

  // Has summary
  if (data.summary && data.summary.length > 50) score += 8;

  // Has experience with bullets
  const expWithBullets = data.experience.filter(
    (e) => e.company && e.bullets.filter(Boolean).length >= 2
  );
  score += Math.min(expWithBullets.length * 5, 10);

  // Has education
  if (data.education.some((e) => e.school)) score += 5;

  // Has skills
  const skillCount = data.skills.filter(Boolean).length;
  score += Math.min(skillCount * 1, 7);

  // Job description match bonus
  if (data.jobDescription && data.jobDescription.length > 100) score += 5;

  return Math.min(score, 99);
}

export async function POST(req: NextRequest) {
  try {
    const data: ResumeData = await req.json();

    // In production, call OpenAI/Anthropic here:
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({...});

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate enhanced content
    const summary = generateSummary(data);

    const enhancedExperience = data.experience.map((exp) => ({
      ...exp,
      bullets: enhanceBullets(exp.bullets, exp.role),
    }));

    const atsScore = calculateAtsScore({ ...data, summary });

    return NextResponse.json({
      summary,
      experience: enhancedExperience,
      atsScore,
      suggestions: [
        "Add quantifiable metrics to your bullet points (e.g., 'increased revenue by 30%')",
        "Include more industry-specific keywords from the job description",
        "Consider adding a LinkedIn profile URL",
      ],
    });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again." },
      { status: 500 }
    );
  }
}
