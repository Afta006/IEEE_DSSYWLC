import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  // Check env vars
  if (!sheetId || !email || !key) {
    return NextResponse.json({
      step: "ENV_CHECK",
      error: "Missing environment variables",
      GOOGLE_SHEET_ID: sheetId ? "✅ set" : "❌ MISSING",
      GOOGLE_SERVICE_ACCOUNT_EMAIL: email ? "✅ set" : "❌ MISSING",
      GOOGLE_PRIVATE_KEY: key ? "✅ set" : "❌ MISSING",
    });
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      new Date().toISOString(),
      "API Test Entry",
      "api-test@debug.com",
      "+910000000000",
      "API Test",
      "student",
      "",
      "No",
      "",
      "",
      "",
      "api-test-key",
      "https://ieee-dssywlc.vercel.app/profiles?token=api-test",
      "under_review",
      "",
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:O",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({
      step: "SUCCESS",
      updatedRange: result.data.updates?.updatedRange,
      updatedRows: result.data.updates?.updatedRows,
    });
  } catch (err: unknown) {
    return NextResponse.json({
      step: "ERROR",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
