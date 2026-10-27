const key = process.env.NEBIUS_API_KEY;
const baseUrl = (process.env.NEBIUS_BASE_URL || "https://api.tokenfactory.nebius.com/v1").replace(/\/$/, "");

if (!key) {
  console.error("Set NEBIUS_API_KEY before listing models. Example: NEBIUS_API_KEY=... npm run models:nebius");
  process.exit(1);
}

const response = await fetch(`${baseUrl}/models`, {
  headers: { Authorization: `Bearer ${key}` }
});

if (!response.ok) {
  console.error(`Nebius model list failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
  process.exit(1);
}

const payload = await response.json();
const modelIds = (payload.data ?? [])
  .map((model) => model.id)
  .filter((id) => typeof id === "string" && /nemotron/i.test(id))
  .sort();

if (!modelIds.length) {
  console.log("No model ID containing 'nemotron' was returned for this account. Check the Token Factory catalog and account access.");
  process.exit(0);
}

console.log(modelIds.join("\n"));
