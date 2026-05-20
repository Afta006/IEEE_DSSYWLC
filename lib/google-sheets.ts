/**
 * Google Sheets integration — pushes new registrations to a Google Sheet
 * using the Google Sheets API v4 with a service account.
 *
 * This replaces the Google Apps Script webhook approach because
 * Google blocks Apps Script web-app requests from cloud IPs (Vercel / AWS).
 *
 * Required env vars:
 *   GOOGLE_SHEET_ID              — The spreadsheet ID from the Sheet URL
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL — Service account email (xxx@xxx.iam.gserviceaccount.com)
 *   GOOGLE_PRIVATE_KEY           — The private key from the service account JSON (with \n kept)
 */

import { google } from "googleapis";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !key) {
    return null;
  }

  return new google.auth.JWT({
    email,
    // Vercel stores env vars with literal "\n" — convert to actual newlines
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function pushRegistrationToSheet(data: {
  profileToken: string;
  fullName: string;
  email: string;
  phone: string;
  affiliation: string;
  category: string;
  referralCode: string | null;
  isMember: boolean;
  ieeeId: string | null;
  studentBranchCode: string | null;
  ieeeCardS3Key: string | null;
  paymentScreenshotS3Key: string;
  registrationStatus: string;
}): Promise<boolean> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getAuth();

  if (!auth || !sheetId) {
    console.warn(
      "Google Sheets API credentials not configured — skipping sheet sync. " +
        `(GOOGLE_SHEET_ID: ${sheetId ? "set" : "MISSING"}, ` +
        `SERVICE_ACCOUNT: ${auth ? "set" : "MISSING"})`
    );
    return false;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ieee-dssywlc.vercel.app";
  const profileLink =
    siteUrl + "/profiles?token=" + encodeURIComponent(data.profileToken);

  // Row values — must match the header order in the spreadsheet
  const row = [
    new Date().toISOString(),           // A: Timestamp
    data.fullName,                      // B: Full Name
    data.email,                         // C: Email
    data.phone,                         // D: Phone
    data.affiliation,                   // E: College / Org
    data.category,                      // F: Category
    data.referralCode || "",            // G: Referral Code
    data.isMember ? "Yes" : "No",       // H: IEEE Member?
    data.ieeeId || "",                  // I: IEEE ID
    data.studentBranchCode || "",       // J: Branch Code
    data.ieeeCardS3Key || "",           // K: IEEE Card (S3)
    data.paymentScreenshotS3Key || "",  // L: Payment Screenshot (S3)
    profileLink,                        // M: Profile Link
    data.registrationStatus || "under_review", // N: Status
    "",                                 // O: Admin Remarks
  ];

  try {
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:O",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("Google Sheet sync OK via Sheets API");
    return true;
  } catch (error) {
    console.error("Failed to push to Google Sheet:", error);
    return false;
  }
}
