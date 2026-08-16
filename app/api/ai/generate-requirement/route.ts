import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

// Initialize Gemini lazily/safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const fallbackRequirement = (prompt: string, isError: boolean) => ({
  title: prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt,
  category: isError ? 'Executive Leadership' : 'Executive Leadership',
  targetAudience: isError ? 'Middle Management' : 'Middle to Senior Management',
  deliveryMode: 'Hybrid',
  cohortSize: isError ? 30 : 25,
  durationDays: 2,
  budgetRange: '₹1,000,000 - ₹2,500,000',
  location: isError ? 'Mumbai, India' : 'Mumbai / Hybrid',
  objectives: isError
    ? 'Strengthen managerial skills, team alignment, and performance execution.'
    : `1. Enhance core capabilities regarding "${prompt}".\n2. Foster cross-functional team alignment and strategic execution.\n3. Implement practical frameworks with measurable 90-day impact metrics.`,
  additionalRequirements: isError
    ? 'Real-world simulations and post-training evaluation.'
    : 'Interactive case-study based approach, pre-assessment surveys, and post-training action plan coaching.',
  suggestedSkills: isError
    ? ['Leadership', 'Communication', 'Strategy']
    : ['Leadership', 'Strategic Thinking', 'Change Management', 'Executive Communication'],
});

export async function POST(req: NextRequest) {
  let prompt: string | undefined;
  let companyName: string | undefined;
  try {
    const body = await req.json();
    prompt = body?.prompt;
    companyName = body?.companyName;
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback intelligent requirement template
      return NextResponse.json(fallbackRequirement(prompt, false));
    }

    const sysInstruction = `You are an expert Corporate L&D Director. Generate a structured enterprise training requirement RFP in JSON format based on the user's prompt. Return ONLY valid JSON with keys: title, category, targetAudience, deliveryMode (In-Person/Virtual/Hybrid), cohortSize (number), durationDays (number), budgetRange, location, objectives, additionalRequirements, suggestedSkills (array of strings).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Company: ${companyName || 'Enterprise Partner'}\nUser Prompt: ${prompt}`,
      config: {
        systemInstruction: sysInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } else {
      throw new Error('Empty AI response');
    }
  } catch (err) {
    console.error('Error generating requirement:', err);
    // Fallback response on error
    return NextResponse.json(fallbackRequirement(prompt || 'Corporate Training Program', true));
  }
}
