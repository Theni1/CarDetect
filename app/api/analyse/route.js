import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const ai = new GoogleGenAI({});
  const formData = await req.formData();
  const image = formData.get("image");
  const imageArrayBuffer = await image.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: image.type,
          data: base64ImageData,
        },
      },
      {
        text: `
        Analyze the image and return ONLY valid JSON. Fields:
        - make: string or null
        - model: string or null
        - approximate_year: number or null
        - confidence: number between 0 and 1

        If unsure, use null and confidence of "undefined"

        Example:
        {
        "make": "Toyota",
        "model": "Corolla",
        "approximate_year": 2019,
        "confidence": 0.83
        }
        `,
      },
    ],
  });

  return Response.json({ test: result.text });
}
