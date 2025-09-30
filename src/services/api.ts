const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function generateSuggestion(prompt: string): Promise<string> {
  const key = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  if (!key) {
    await fetch("/mock/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    await new Promise((r) => setTimeout(r, 300));
    return `(Mock suggestion) ${prompt.slice(0, 120)}`;
  }

  try {
    const resp = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 250,
        temperature: 0.8,
      }),
    });
    if (!resp.ok) {
      const errBody = await resp.json().catch(() => null);
      throw new Error(
        errBody?.error?.message || `OpenAI request failed (${resp.status})`
      );
    }
    const json = await resp.json().catch(() => null);
    return (json?.choices?.[0]?.message?.content || "").trim();
  } catch (err: unknown) {
    const e = err as any;
    throw new Error(e?.message || "Error");
  }
}

export function isOpenAIConfigured(): boolean {
  return Boolean(import.meta.env.VITE_OPENAI_API_KEY);
}

export async function submitApplication(data: Record<string, unknown> | null) {
  const resp = await fetch("/mock/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data || {}),
  });
  if (resp && resp.ok)
    return (
      (await resp.json().catch(() => null)) || {
        ok: true,
        id: Date.now().toString(),
      }
    );

  await new Promise((r) => setTimeout(r, 500));
  return { ok: true, id: Date.now().toString() };
}

export const STORAGE_KEY = "social_support_application_v1";
export const SUBMISSIONS_KEY = "social_support_submissions_v1";

export function saveSubmission(entry: Record<string, unknown>) {
  const raw = localStorage.getItem(SUBMISSIONS_KEY);
  const list = raw ? JSON.parse(raw) : [];
  list.push({ ...entry, submittedAt: new Date().toISOString() });
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list));
}

export function saveDraft(data: Record<string, unknown>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearDraft() {
  localStorage.removeItem(STORAGE_KEY);
}
