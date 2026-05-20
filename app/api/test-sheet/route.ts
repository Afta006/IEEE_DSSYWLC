import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  // Step 1: Check if env var exists
  if (!url) {
    return NextResponse.json({
      step: "ENV_CHECK",
      error: "GOOGLE_SHEET_WEBHOOK_URL is NOT set on this deployment",
      allEnvKeys: Object.keys(process.env).filter((k) =>
        k.includes("GOOGLE")
      ),
    });
  }

  // Step 2: Try pushing test data
  try {
    const payload = {
      action: "new_registration",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-dssywlc.vercel.app",
      profileToken: "vercel-env-test-" + Date.now(),
      fullName: "Vercel Env Test",
      email: "vercel-test@debug.com",
      phone: "+910000000000",
      affiliation: "Vercel Debug",
      category: "student",
      referralCode: null,
      isMember: false,
      ieeeId: null,
      studentBranchCode: null,
      ieeeCardS3Key: null,
      paymentScreenshotS3Key: "vercel-env-test",
      registrationStatus: "under_review",
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    return NextResponse.json({
      step: "FETCH_COMPLETE",
      envVarSet: true,
      webhookUrl: url.substring(0, 50) + "...",
      fetchStatus: response.status,
      fetchStatusText: response.statusText,
      redirected: response.redirected,
      responseBody: text,
    });
  } catch (err: unknown) {
    return NextResponse.json({
      step: "FETCH_ERROR",
      envVarSet: true,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
  }
}
