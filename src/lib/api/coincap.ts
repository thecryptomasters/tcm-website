import { CoinCapResponse, CoinCapSingleResponse, CoinCapHistoryResponse } from "@/types";

const BASE_URL = "https://api.coincap.io/v2";

export async function getAssets(limit = 100, offset = 0): Promise<CoinCapResponse> {
  const res = await fetch(`${BASE_URL}/assets?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch assets");
  return res.json();
}

export async function getAsset(id: string): Promise<CoinCapSingleResponse> {
  const res = await fetch(`${BASE_URL}/assets/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch asset: ${id}`);
  return res.json();
}

export async function getAssetHistory(
  id: string,
  interval: string = "d1",
  start?: number,
  end?: number
): Promise<CoinCapHistoryResponse> {
  const params = new URLSearchParams({ interval });
  if (start) params.set("start", start.toString());
  if (end) params.set("end", end.toString());
  const res = await fetch(`${BASE_URL}/assets/${id}/history?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Failed to fetch history: ${id}`);
  return res.json();
}

export function getTopAssetIds(): string[] {
  return ["bitcoin", "ethereum", "solana", "cardano", "dogecoin", "polkadot", "avalanche", "chainlink"];
}
