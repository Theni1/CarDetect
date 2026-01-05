import { GoogleGenAI } from "@google/genai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "43200 s"),
  analytics: true,
  });

export async function POST(req) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
  const identifier = req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown";
  const { success } = await ratelimit.limit(identifier);
  if (!success) {
    return Response.json ({success: false, data: null, error: "Too many requests"})
  }

  const ai = new GoogleGenAI({});
  const formData = await req.formData();
  const image = formData.get("image");
  if (!image) {
    return Response.json ({success: false, data: null, error: "Image not found"},  {status: 400})
  }

  if (!image.type.startsWith ("image/") || !allowedTypes.includes(image.type))
      return Response.json ({ success: false, data: null,  error: "Invalid file type"}, {status: 415})

  if (image.size > 5 * 1024 * 1024)
      return Response.json ({success: false, data: null, error: "File exceeds 5 MB" }, {status: 413})

  const imageArrayBuffer = await image.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");
  const result = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        inlineData: {
          mimeType: image.type,
          data: base64ImageData,
        },
      },
      {
        text: `
        Accurately identify the vehicle make, model, year and top posts about this car and return only valid JSON.

        Rules:
        - If the make or model is not clearly identifiable, return null.
        - Do NOT guess between similar models or years.
        - Be conservative. Prefer null over guessing.

        Fields:
        - make: string or null
        - model: string or null
        - approximate_year: number or null
        - confidence: number between 0 and 1
        `,
      },
    ],
  });
  try {
    let rawText = result.text;
    rawText = rawText.replace(/```json|```/g, "").trim();
    let parsed = JSON.parse(rawText);
    return Response.json({success: true, data: parsed, error: null}, {status: 200}); }
  catch {
    return Response.json({success: false, data: null, error: "AI could not analyse the image"}, {status: 200});
  }
}