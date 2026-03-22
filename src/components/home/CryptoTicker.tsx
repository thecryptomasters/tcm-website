"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface TickerCoin {
  id: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

export default function CryptoTicker() {
  const [coins, setCoins] = useState<TickerCoin[]>([]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          "https://api.coincap.io/v2/assets?limit=10"
        );
        const data = await res.json();
        setCoins(data.data);
      } catch {
        // Silently fail - ticker is non-critical
      }
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (coins.length === 0) return null;

  return (
    <div className="bg-primary-dark/80 border-y border-gray-700/50 overflow-hidden">
      <div className="animate-[scroll_30s_linear_infinite] flex whitespace-nowrap py-2">
        {[...coins, ...coins].map((coin, i) => {
          const price = parseFloat(coin.priceUsd);
          const change = parseFloat(coin.changePercent24Hr);
          return (
            <span key={`${coin.id}-${i}`} className="inline-flex items-center gap-2 mx-6 text-sm">
              <span className="text-gray-400 font-medium uppercase">{coin.symbol}</span>
              <span className="text-white">{formatCurrency(price)}</span>
              <span className={change >= 0 ? "text-green" : "text-red"}>
                {formatPercent(change)}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
