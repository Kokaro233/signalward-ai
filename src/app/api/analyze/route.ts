import { NextResponse } from "next/server";
import { analyzeWithQwen } from "@/lib/qwen";
import { reviewWithNemotron } from "@/lib/nebius-nemotron";
import { reconcile } from "@/lib/evidence-reconciliation";

export async function POST(request: Request) {
 try {
 const body = await request.json();
 if (typeof body.text !== "undefined" && typeof body.text !== "string") return NextResponse.json({error:"Invalid text"},{status:400});
 const images = body.imagesBase64 ?? (body.imageBase64 ? [body.imageBase64] : []);
 const mimeTypes = body.mimeTypes ?? (body.mimeType ? [body.mimeType] : []);
 const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
 if (!Array.isArray(images) || images.length > 5 || images.some((x: unknown)=>typeof x !== "string" || x.length > 7000000) || (body.text?.length ?? 0) > 30000) return NextResponse.json({error:"Input exceeds limits"},{status:400});
 if (!Array.isArray(mimeTypes) || mimeTypes.some((x: unknown) => typeof x !== "string" || !allowedMimeTypes.has(x))) return NextResponse.json({error:"Unsupported image type"},{status:400});
 if (!body.text?.trim() && !images.length) return NextResponse.json({error:"Submit text or an image"},{status:400});
 let result = await analyzeWithQwen(body);
 try { result = reconcile(result, await reviewWithNemotron(body.text ?? "",result,Boolean(images.length),body.outputLanguage ?? "en")); }
 catch { result = {...result, primary_risk_level:result.risk_level,reconciliation:"unavailable",tool_timeline:[...result.tool_timeline,"Independent review unavailable; primary analysis only."]}; }
 return NextResponse.json(result);
 } catch (error) {
   console.error("SignalWard analysis failed", error instanceof Error ? error.message : error);
   return NextResponse.json({error:"Live analysis unavailable. Check server-side model configuration and retry. No sample result was substituted."},{status:503});
 }
}
