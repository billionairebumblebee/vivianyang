import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = {
      capturedAt: new Date().toISOString(),
      role: typeof body?.role === "string" ? body.role.trim() : "",
      interest: typeof body?.interest === "string" ? body.interest.trim() : "",
      name: typeof body?.name === "string" ? body.name.trim() : "",
      bestContact: typeof body?.bestContact === "string" ? body.bestContact.trim() : "",
      message: typeof body?.message === "string" ? body.message.trim() : "",
    };

    if (!payload.name || !payload.bestContact || !payload.message) {
      return NextResponse.json({ ok: false, error: "missing_required_fields" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), "logs");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "portfolio-contact-leads.jsonl"), `${JSON.stringify(payload)}\n`, "utf8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "contact_lead_failed",
      },
      { status: 500 },
    );
  }
}
