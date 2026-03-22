import { CoinGeckoMarketCoin, CoinGeckoDetail, CoinGeckoChartData, CoinGeckoGlobal } from "@/types";

const BASE_URL = "https://api.coingecko.com/api/v3";

const HEADERS: HeadersInit = {
  "Accept": "application/json",
  "x-cg-demo-api-key": "CG-DEMO",
};

export async function getMarkets(
  page = 1,
  perPage = 100,
  sparkline = true
): Promise<CoinGeckoMarketCoin[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: perPage.toString(),
    page: page.toString(),
    sparkline: sparkline.toString(),
    price_change_percentage: "24h,7d,30d",
  });
  const res = await fetch(`${BASE_URL}/coins/markets?${params}`, {
    headers: HEADERS,
    next: { revalidate: 120 },
  });
  if (!res.ok) throw new Error("Failed to fetch markets");
  return res.json();
}

export async function getCoinDetail(id: string): Promise<CoinGeckoDetail> {
  const res = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
    { headers: HEADERS, next: { revalidate: 120 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch coin: ${id}`);
  return res.json();
}

export async function getCoinChart(
  id: string,
  from: number,
  to: number
): Promise<CoinGeckoChartData> {
  const res = await fetch(
    `${BASE_URL}/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
    { headers: HEADERS, next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch chart: ${id}`);
  return res.json();
}

export async function searchCoins(query: string): Promise<{ coins: { id: string; name: string; symbol: string; thumb: string }[] }> {
  const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, {
    headers: HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to search coins");
  return res.json();
}

export async function getGlobalData(): Promise<CoinGeckoGlobal> {
  const res = await fetch(`${BASE_URL}/global`, {
    headers: HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch global data");
  return res.json();
}
