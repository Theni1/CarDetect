## Overview
CarDetect is a full-stack web application that allows users to upload images of cars and receive AI-generated identification results using Google’s Gemini API.

## Technologies

- Next.js (React)
- JavaScript
- Tailwind CSS
- Google's Gemini API
- Vercel (Deployment)

## How it works

1. User uploads an image via the frontend
2. Image is sent to a Next.js API route
3. API calls Gemini API to analyze the image
4. Results are returned and rendered in the UI

## How to run locally

1. git clone https://github.com/Theni1/CarDetect.git
2. npm install
3. Create a local file named .env.local with:
   GEMINI_API_KEY=your_api_key_here
   UPSTASH_REDIS_REST_URL=your_api_key_here
   UPSTASH_REDIS_REST_TOKEN=your_api_key_here
4. npm run dev





