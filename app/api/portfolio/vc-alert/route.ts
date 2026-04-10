import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = {
      capturedAt: new Date().toISOString(),
      name: typeof body?.name === "string" ? body.name.trim() : "",
      firm: typeof body?.firm === "string" ? body.firm.trim() : "",
      contact: typeof body?.contact === "string" ? body.contact.trim() : "",
      interest: typeof body?.interest === "string" ? body.interest.trim() : "",
    };

    const dir = path.join(process.cwd(), "logs");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "portfolio-vc-leads.jsonl"), `${JSON.stringify(payload)}\n`, "utf8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "vc_alert_failed",
      },
      { status: 500 },
    );
  }
}
