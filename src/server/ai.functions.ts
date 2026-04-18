import { createServerFn } from '@tanstack/react-start';

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions';
const MODEL = 'google/gemini-3-flash-preview';

async function callAI(body: Record<string, unknown>) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error('LOVABLE_API_KEY is not configured');

  const res = await fetch(GATEWAY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, ...body }),
  });

  if (res.status === 429) throw new Error('Rate limit exceeded. Please try again in a moment.');
  if (res.status === 402) throw new Error('AI credits exhausted. Please add credits in Settings → Workspace → Usage.');
  if (!res.ok) {
    const text = await res.text();
    console.error('AI gateway error', res.status, text);
    throw new Error(`AI request failed (${res.status})`);
  }
  return res.json();
}

/* ---------- Improve bullets ---------- */
export const improveBullets = createServerFn({ method: 'POST' })
  .inputValidator((input: { bullets: string[]; role?: string; company?: string }) => {
    if (!Array.isArray(input.bullets)) throw new Error('bullets must be an array');
    if (input.bullets.length === 0 || input.bullets.length > 15) throw new Error('Provide 1-15 bullets');
    return input;
  })
  .handler(async ({ data }) => {
    const result = await callAI({
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume coach. Rewrite resume bullet points to be more impactful: start with strong action verbs, quantify impact when possible, use the XYZ framework (accomplished X, as measured by Y, by doing Z), and keep them concise (1-2 lines). Preserve the original meaning. Do not invent specific numbers if none were given — keep them realistic.',
        },
        {
          role: 'user',
          content: `Rewrite these bullets${data.role ? ` for a ${data.role}` : ''}${data.company ? ` at ${data.company}` : ''}:\n\n${data.bullets.map((b, i) => `${i + 1}. ${b || '(empty)'}`).join('\n')}`,
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'return_improved_bullets',
            description: 'Return the rewritten bullets in the same order',
            parameters: {
              type: 'object',
              properties: {
                bullets: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'The rewritten bullet points, same count and order as input',
                },
              },
              required: ['bullets'],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: 'function', function: { name: 'return_improved_bullets' } },
    });

    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('AI did not return improved bullets');
    const parsed = JSON.parse(toolCall.function.arguments);
    return { bullets: parsed.bullets as string[] };
  });

/* ---------- ATS score ---------- */
export const analyzeATS = createServerFn({ method: 'POST' })
  .inputValidator((input: { resumeText: string; jobDescription?: string }) => {
    if (!input.resumeText || input.resumeText.length < 50) throw new Error('Resume content is too short to analyze');
    if (input.resumeText.length > 20000) throw new Error('Resume is too long');
    return input;
  })
  .handler(async ({ data }) => {
    const result = await callAI({
      messages: [
        {
          role: 'system',
          content:
            'You are an ATS (Applicant Tracking System) analyzer. Evaluate resumes for ATS compatibility, keyword optimization, formatting clarity, action verbs, quantifiable achievements, and completeness. Be strict but fair. Score 0-100.',
        },
        {
          role: 'user',
          content: `Analyze this resume for ATS compatibility${data.jobDescription ? ' against the provided job description' : ''}.\n\n=== RESUME ===\n${data.resumeText}${data.jobDescription ? `\n\n=== JOB DESCRIPTION ===\n${data.jobDescription}` : ''}`,
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'return_ats_analysis',
            description: 'Return ATS analysis results',
            parameters: {
              type: 'object',
              properties: {
                score: { type: 'number', description: 'ATS compatibility score 0-100' },
                summary: { type: 'string', description: 'One-sentence summary of the score' },
                strengths: { type: 'array', items: { type: 'string' }, description: '3-5 strengths' },
                improvements: { type: 'array', items: { type: 'string' }, description: '3-6 actionable improvements' },
                missingKeywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Important keywords missing from the resume (especially relative to job description if provided)',
                },
                matchedKeywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Important keywords found in the resume',
                },
              },
              required: ['score', 'summary', 'strengths', 'improvements', 'missingKeywords', 'matchedKeywords'],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: 'function', function: { name: 'return_ats_analysis' } },
    });

    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('AI did not return analysis');
    return JSON.parse(toolCall.function.arguments) as {
      score: number;
      summary: string;
      strengths: string[];
      improvements: string[];
      missingKeywords: string[];
      matchedKeywords: string[];
    };
  });
