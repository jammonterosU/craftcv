import { NextRequest, NextResponse } from "next/server";
import type { ResumeData } from "@/components/builder/ResumeBuilder";

// AI Resume Generation API
// Uses Google Gemini (FREE tier: 15 req/min, 1M tokens/day)
// Get your free API key at: https://aistudio.google.com

async function generateWithGemini(data: ResumeData): Promise<{
  summary: string;
  experience: ResumeData["experience"];
  atsScore: number;
  suggestions: string[];
}> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Fallback: smart demo generation (no API key needed)
    return generateFallback(data);
  }

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an expert resume writer and career coach. Generate an optimized resume for this candidate.

CANDIDATE INFO:
- Name: ${data.fullName}
- Target Role: ${data.jobTitle}
- Current Experience: ${data.experience.map((e) => `${e.role} at ${e.company}`).join(", ")}
- Skills: ${data.skills.filter(Boolean).join(", ")}
- Current Summary: ${data.summary || "None provided"}

${data.jobDescription ? `JOB DESCRIPTION TO OPTIMIZE FOR:\n${data.jobDescription}` : ""}

TASK: Return a JSON object with:
1. "summary": A compelling 2-3 sentence professional summary (ATS-optimized, keyword-rich)
2. "enhancedBullets": Array of arrays - improved bullet points for each experience (use strong action verbs + metrics)
3. "atsScore": Number 70-99 representing ATS compatibility score
4. "suggestions": Array of 3 specific improvement tips

Return ONLY valid JSON, no markdown.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Parse JSON response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid AI response");

  const aiResult = JSON.parse(jsonMatch[0]);

  // Apply enhanced bullets to experience
  const enhancedExperience = data.experience.map((exp, i) => ({
    ...exp,
    bullets: aiResult.enhancedBullets?.[i] || exp.bullets,
  }));

  return {
    summary: aiResult.summary || generateFallback(data).summary,
    experience: enhancedExperience,
    atsScore: aiResult.atsScore || calculateAtsScore(data),
    suggestions: aiResult.suggestions || [],
  };
}

function generateFallback(data: ResumeData) {
  const title = data.jobTitle || "professional";
  const skills = data.skills.filter(Boolean).slice(0, 3).join(", ");
  const hasExperience = data.experience.some((e) => e.company);

  const summaries = [
    `Results-driven ${title} with a proven track record of delivering high-impact solutions${skills ? ` in ${skills}` : ""}. Passionate about leveraging cutting-edge technology to drive business growth and create exceptional user experiences. Strong collaborator with excellent communication skills and a data-driven approach to problem-solving.`,
    `Dynamic ${title} combining technical expertise${skills ? ` in ${skills}` : ""} with strong business acumen. ${hasExperience ? "Demonstrated success in leading cross-functional initiatives and delivering measurable results." : "Eager to apply academic knowledge and fresh perspectives to real-world challenges."} Known for innovative thinking and ability to thrive in fast-paced environments.`,
    `Accomplished ${title} with deep expertise${skills ? ` in ${skills}` : ""} and a passion for building scalable, user-centric solutions. Track record of exceeding targets and driving organizational success through strategic thinking and hands-on execution. Committed to continuous learning and staying ahead of industry trends.`,
  ];

  const actionVerbs = [
    "Spearheaded", "Architected", "Optimized", "Delivered", "Increased",
    "Reduced", "Implemented", "Collaborated", "Designed", "Launched",
    "Streamlined", "Developed", "Led", "Managed", "Transformed",
  ];

  const enhancedExperience = data.experience.map((exp) => ({
    ...exp,
    bullets: exp.bullets.map((bullet) => {
      if (!bullet.trim()) return bullet;
      const startsWithVerb = actionVerbs.some((v) =>
        bullet.toLowerCase().startsWith(v.toLowerCase())
      );
      if (!startsWithVerb && bullet.length > 5) {
        const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
        return `${verb} ${bullet.charAt(0).toLowerCase()}${bullet.slice(1)}`;
      }
      return bullet;
    }),
  }));

  return {
    summary: summaries[Math.floor(Math.random() * summaries.length)],
    experience: enhancedExperience,
    atsScore: calculateAtsScore(data),
    suggestions: [
      "Add quantifiable metrics to your bullet points (e.g., 'increased revenue by 30%')",
      "Include more industry-specific keywords from the job description",
      "Consider adding a LinkedIn profile URL for credibility",
    ],
  };
}

function calculateAtsScore(data: ResumeData): number {
  let score = 60;
  if (data.email) score += 5;
  if (data.phone) score += 3;
  if (data.location) score += 2;
  if (data.summary && data.summary.length > 50) score += 8;
  const expWithBullets = data.experience.filter(
    (e) => e.company && e.bullets.filter(Boolean).length >= 2
  );
  score += Math.min(expWithBullets.length * 5, 10);
  if (data.education.some((e) => e.school)) score += 5;
  const skillCount = data.skills.filter(Boolean).length;
  score += Math.min(skillCount * 1, 7);
  if (data.jobDescription && data.jobDescription.length > 100) score += 5;
  return Math.min(score, 99);
}

export async function POST(req: NextRequest) {
  try {
    const data: ResumeData = await req.json();
    const result = await generateWithGemini(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again." },
      { status: 500 }
    );
  }
}
