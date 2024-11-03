import { fetchCoinGecko } from "@/lib/coinGeckoApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { coinId: string } }
) {
  try {
    const data = await fetchCoinGecko(`/coins/${params.coinId}`);
    return NextResponse.json({ usd: data.market_data.current_price.usd });
  } catch (e) {
    console.error(e);
    return NextResponse.json(e, { status: 500 });
  }
}
