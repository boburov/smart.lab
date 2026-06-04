/**
 * Gemini integration. We describe the current state of the vessel and ask the
 * model to pick the single most appropriate status from a fixed list, which the
 * lab then turns into a visual effect + sound.
 *
 * The API key is read from `VITE_GEMINI_API_KEY`. If it is missing or the call
 * fails for any reason, this returns `null` so the caller can fall back to the
 * built-in local classifier — the lab keeps working offline.
 *
 * Note: a client-side key is exposed in the bundle; fine for a prototype, but
 * for production the call should be proxied through a backend.
 */

const ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function apiKey(): string | undefined {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return env?.VITE_GEMINI_API_KEY;
}

/**
 * Ask Gemini to classify the lab situation into one of `statuses`. Resolves to
 * the chosen status string (guaranteed to be a member of `statuses`) or `null`.
 */
export async function classifyLabStatus(
  situation: string,
  statuses: readonly string[],
): Promise<string | null> {
  const key = apiKey();
  if (!key) return null;

  try {
    const response = await fetch(`${ENDPOINT}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "Sen kimyo laboratoriyasi simulyatorisan. Idishdagi moddalar " +
                  "asosida ro'y berishi mumkin bo'lgan eng mos holatni tanla.\n" +
                  `Mumkin bo'lgan holatlar: ${statuses.join(", ")}.\n` +
                  `Vaziyat: ${situation}\n` +
                  'Faqat JSON qaytar: {"status": "<holat>"}',
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: { status: { type: "STRING", enum: [...statuses] } },
            required: ["status"],
          },
          temperature: 0.2,
        },
      }),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== "string") return null;

    const parsed = JSON.parse(text) as { status?: unknown };
    return typeof parsed.status === "string" && statuses.includes(parsed.status)
      ? parsed.status
      : null;
  } catch {
    return null;
  }
}
