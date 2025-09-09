// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  // Add a secret check if exposing this endpoint
  try {
    // Revalidate the blog index
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, { cache: "no-store" });
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 500 });
  }
}
