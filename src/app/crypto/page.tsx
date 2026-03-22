"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight, TrendingUp, BarChart3, Coins } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { CoinGeckoMarketCoin } from "@/types";

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 30;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-24 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function CryptoPricesPage() {
  const [coins, setCoins] = useState<CoinGeckoMarketCoin[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [globalData, setGlobalData] = useState<{
    active_cryptocurrencies: number;
    total_market_cap: number;
    btc_dominance: number;
  } | null>(null);

  useEffect(() => {
    async function fetchCoins() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=24h,7d,30d`
        );
        const data = await res.json();
        setCoins(data);
      } catch {
        // Fallback to CoinCap
        try {
          const res = await fetch(`https://api.coincap.io/v2/assets?limit=100&offset=${(page - 1) * 100}`);
          const data = await res.json();
          setCoins(
            data.data.map((c: Record<string, string>) => ({
              id: c.id,
              symbol: c.symbol?.toLowerCase(),
              name: c.name,
              image: "",
              current_price: parseFloat(c.priceUsd),
              market_cap: parseFloat(c.marketCapUsd),
              market_cap_rank: parseInt(c.rank),
              price_change_percentage_24h: parseFloat(c.changePercent24Hr),
              sparkline_in_7d: null,
            }))
          );
        } catch {
          // both failed
        }
      }
      setLoading(false);
    }
    fetchCoins();
  }, [page]);

  useEffect(() => {
    async function fetchGlobal() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/global");
        const data = await res.json();
        setGlobalData({
          active_cryptocurrencies: data.data.active_cryptocurrencies,
          total_market_cap: data.data.total_market_cap.usd,
          btc_dominance: data.data.market_cap_percentage.btc,
        });
      } catch {
        // ignore
      }
    }
    fetchGlobal();
  }, []);

  const filtered = search
    ? coins.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : coins;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Crypto <span className="text-accent">Prices</span>
          </h1>
          <p className="text-gray-400">Live cryptocurrency prices and market data.</p>
        </div>

        {/* Market Stats Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search coins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-sm text-gray-400 hover:text-accent transition-colors"
          >
            {showStats ? "Hide" : "Show"} Market Stats
          </button>
        </div>

        {showStats && globalData && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4 flex items-center gap-3">
              <Coins className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500">Total Coins</p>
                <p className="text-white font-semibold">{globalData.active_cryptocurrencies.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4 flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500">Total Market Cap</p>
                <p className="text-white font-semibold">{formatCurrency(globalData.total_market_cap)}</p>
              </div>
            </div>
            <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-gray-500">BTC Dominance</p>
                <p className="text-white font-semibold">{globalData.btc_dominance.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Price Table */}
        <div className="bg-card/40 backdrop-blur border border-gray-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50 text-gray-400 text-xs uppercase">
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3">Coin</th>
                  <th className="text-right px-4 py-3">Price</th>
                  <th className="text-right px-4 py-3">24h %</th>
                  <th className="text-right px-4 py-3 hidden md:table-cell">7d %</th>
                  <th className="text-right px-4 py-3 hidden lg:table-cell">30d %</th>
                  <th className="text-right px-4 py-3 hidden sm:table-cell">Market Cap</th>
                  <th className="text-right px-4 py-3 hidden lg:table-cell">7d Chart</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b border-gray-800/50">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="h-4 bg-gray-700/50 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                  : filtered.map((coin) => (
                      <tr
                        key={coin.id}
                        className="border-b border-gray-800/30 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 text-gray-500">{coin.market_cap_rank}</td>
                        <td className="px-4 py-3">
                          <Link href={`/crypto/${coin.id}`} className="flex items-center gap-3">
                            {coin.image && (
                              <Image src={coin.image} alt={coin.name} width={24} height={24} className="rounded-full" />
                            )}
                            <div>
                              <span className="text-white font-medium">{coin.name}</span>
                              <span className="text-gray-500 ml-2 uppercase">{coin.symbol}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-right text-white">{formatCurrency(coin.current_price)}</td>
                        <td className={`px-4 py-3 text-right ${coin.price_change_percentage_24h >= 0 ? "text-green" : "text-red"}`}>
                          {formatPercent(coin.price_change_percentage_24h ?? 0)}
                        </td>
                        <td className={`px-4 py-3 text-right hidden md:table-cell ${(coin.price_change_percentage_7d_in_currency ?? 0) >= 0 ? "text-green" : "text-red"}`}>
                          {coin.price_change_percentage_7d_in_currency != null
                            ? formatPercent(coin.price_change_percentage_7d_in_currency)
                            : "—"}
                        </td>
                        <td className={`px-4 py-3 text-right hidden lg:table-cell ${(coin.price_change_percentage_30d_in_currency ?? 0) >= 0 ? "text-green" : "text-red"}`}>
                          {coin.price_change_percentage_30d_in_currency != null
                            ? formatPercent(coin.price_change_percentage_30d_in_currency)
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right hidden sm:table-cell text-white">
                          {formatCurrency(coin.market_cap)}
                        </td>
                        <td className="px-4 py-3 text-right hidden lg:table-cell">
                          {coin.sparkline_in_7d?.price && (
                            <Sparkline
                              data={coin.sparkline_in_7d.price}
                              positive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 bg-card border border-gray-700 rounded-lg text-gray-300 hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-gray-400 text-sm">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-1 px-4 py-2 bg-card border border-gray-700 rounded-lg text-gray-300 hover:border-accent transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">Powered by CoinGecko & CoinCap</p>
      </div>
    </div>
  );
}
