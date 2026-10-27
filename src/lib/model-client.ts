type Provider = "QWEN" | "NEBIUS";
type Message = { role: string; content: unknown };

const defaults = {
  QWEN: {
    model: "qwen3-vl-plus",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  },
  NEBIUS: {
    model: "",
    baseUrl: "https://api.tokenfactory.nebius.com/v1"
  }
} satisfies Record<Provider, { model: string; baseUrl: string }>;

function providerConfig(provider: Provider) {
  const key =
    process.env[`${provider}_API_KEY`] ||
    (provider === "QWEN" ? process.env.DASHSCOPE_API_KEY : undefined);
  const model = process.env[`${provider}_MODEL`] || defaults[provider].model;
  const baseUrl = process.env[`${provider}_BASE_URL`] || defaults[provider].baseUrl;

  if (!key) throw new Error(`${provider}_API_KEY is not configured`);
  if (!model) throw new Error(`${provider}_MODEL is not configured`);
  return { key, model, baseUrl: baseUrl.replace(/\/$/, "") };
}

export async function completion(
  provider: Provider,
  messages: Message[],
  json = true
): Promise<string> {
  const { key, model, baseUrl } = providerConfig(provider);
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    signal: AbortSignal.timeout(55_000),
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 4096,
      ...(json ? { response_format: { type: "json_object" } } : {})
    })
  });

  if (!response.ok) {
    const details = (await response.text()).slice(0, 500);
    throw new Error(`${provider} request failed (${response.status}): ${details}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error(`${provider} returned no content`);
  }
  return content;
}

export function parseObject(raw: string): unknown {
  return JSON.parse(raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, ""));
}
