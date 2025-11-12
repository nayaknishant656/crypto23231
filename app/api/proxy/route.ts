import { NextResponse } from "next/server";

const BASE_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url || !url.startsWith("/")) {
      return NextResponse.json(
        { error: "Missing or invalid 'url' parameter. It must start with '/'." },
        { status: 400 }
      );
    }

    const fullUrl = `${BASE_URL}${url}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const response = await fetch(fullUrl, {
      headers: {
        "x-cg-pro-api-key": COINGECKO_API_KEY || "",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        { error: `CoinGecko API returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch CoinGecko data", detail: (err as Error).message },
      { status: 500 }
    );
  }
}
