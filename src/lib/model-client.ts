import https from "node:https";

type Provider = "QWEN" | "NEBIUS";
type Message = { role: string; content: unknown };
type CompletionPayload = { choices?: Array<{ message?: { content?: unknown } }> };

const providerTimeoutMs: Record<Provider, number> = {
  QWEN: 120_000,
  NEBIUS: 45_000
};

const providerMaxTokens: Record<Provider, number> = {
  QWEN: 1_800,
  NEBIUS: 1_000
};

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
  const requestBody = JSON.stringify({
    model,
    messages,
    temperature: 0.2,
    max_tokens: providerMaxTokens[provider],
    ...(provider === "QWEN" ? { enable_thinking: false } : {}),
    ...(json ? { response_format: { type: "json_object" } } : {})
  });
  const payload = provider === "QWEN"
    ? await nodeHttpsJson(`${baseUrl}/chat/completions`, key, requestBody, providerTimeoutMs.QWEN)
    : await fetchJson(`${baseUrl}/chat/completions`, key, requestBody, provider);
  const content = payload.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error(`${provider} returned no content`);
  }
  return content;
}

async function fetchJson(url: string, key: string, body: string, provider: Provider): Promise<CompletionPayload> {
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(providerTimeoutMs[provider]),
    body
  });
  if (!response.ok) {
    const details = (await response.text()).slice(0, 500);
    throw new Error(`${provider} request failed (${response.status}): ${details}`);
  }
  return response.json() as Promise<CompletionPayload>;
}

function nodeHttpsJson(url: string, key: string, body: string, timeoutMs: number): Promise<CompletionPayload> {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "POST",
        family: 4,
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (response) => {
        const chunks: Buffer[] = [];
        response.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        response.on("end", () => {
          clearTimeout(deadline);
          const text = Buffer.concat(chunks).toString("utf8");
          if (!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`QWEN request failed (${response.statusCode ?? "unknown"}): ${text.slice(0, 500)}`));
            return;
          }
          try {
            resolve(JSON.parse(text));
          } catch {
            reject(new Error("QWEN returned invalid JSON"));
          }
        });
      }
    );
    const deadline = setTimeout(
      () => request.destroy(new Error(`QWEN request timed out after ${timeoutMs}ms`)),
      timeoutMs
    );
    request.on("error", (error) => {
      clearTimeout(deadline);
      reject(error);
    });
    request.end(body);
  });
}

export function parseObject(raw: string): unknown {
  return JSON.parse(raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, ""));
}
