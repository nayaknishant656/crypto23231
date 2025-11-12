// app/api/coins/markets/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export async function GET(req: Request) {
  const url = new URL(API_URL);
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("per_page", "20");
  url.searchParams.set("page", "1");

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
