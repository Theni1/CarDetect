import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const ai = new GoogleGenAI({});
  const formData = await req.formData();
  const image = formData.get("image");
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
        Accurately identify the vehicle model, manufacturer, and year with your analysis. and return only valid JSON.

        Rules:
        - If the make or model is not clearly identifiable, return null.
        - Do NOT guess between similar models or years.
        - Use a confidence score to reflect uncertainty.

        Fields:
        - make: string or null
        - model: string or null
        - approximate_year: number or null
        - confidence: number between 0 and 1

        If confidence is below 0.6, prefer null values.

        Example:
        {
        "make": null,
        "model": null,
        "approximate_year": null,
        "confidence": 0.45
        }
        `,
      },
    ],
  });
  // Need to parse the response
  let rawText = result.text;
  rawText = rawText.replace(/```json|```/g, "").trim();
  let parsed = JSON.parse(rawText);

  return Response.json({ result: parsed });
}
