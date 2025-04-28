// app/api/sendDiagnosa/route.js

import { sendDiagnosaToGoogleSheets } from "@/lib/sheet";

export async function POST(req : any) {
  try {
    const diagnosaData = await req.json(); 
    await sendDiagnosaToGoogleSheets(diagnosaData);
    return new Response(JSON.stringify({ message: "Data sent to Google Sheets successfully." }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error sending data to Google Sheets." }), { status: 500 });
  }
}
