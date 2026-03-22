"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { CoinGeckoDetail, CoinGeckoChartData } from "@/types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const timeRanges = [
  { label: "24H", days: 1 },
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
  { label: "MAX", days: 1825 },
];

export default function CoinDetailPage({ params }: { params: Promise<{ coinId: string }> }) {
  const { coinId } = use(params);
  const [coin, setCoin] = useState<CoinGeckoDetail | null>(null);
  const [chartData, setChartData] = useState<{ date: string; price: number }[]>([]);
  const [selectedRange, setSelectedRange] = useState(30);
  const [loading, setLoading] = useState(true);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
        );
        const data = await res.json();
        setCoin(data);
      } catch {
        // ignore
      }
      setLoading(false);
    }
    fetchCoin();
  }, [coinId]);

  useEffect(() => {
    async function fetchChart() {
      const now = Math.floor(Date.now() / 1000);
      const from = now - selectedRange * 86400;
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${now}`
        );
        const data: CoinGeckoChartData = await res.json();
        setChartData(
          data.prices.map(([time, price]) => ({
            date: new Date(time).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              ...(selectedRange > 90 ? { year: "2-digit" } : {}),
            }),
            price,
          }))
        );
      } catch {
        // ignore
      }
    }
    fetchChart();
  }, [coinId, selectedRange]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400">Coin not found.</p>
        <Link href="/crypto" className="text-accent mt-4 inline-block">Back to Prices</Link>
      </div>
    );
  }

  const md = coin.market_data;
  const positive = md.price_change_percentage_24h >= 0;
  const description = coin.description?.en?.replace(/<[^>]*>/g, "") || "";

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/crypto" className="hover:text-accent transition-colors">Crypto Prices</Link>
          <span>/</span>
          <span className="text-gray-300">{coin.name}</span>
        </div>

        <Link href="/crypto" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Prices
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {coin.image?.large && (
            <Image src={coin.image.large} alt={coin.name} width={48} height={48} className="rounded-full" />
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{coin.name}</h1>
              <span className="text-gray-500 uppercase text-lg">{coin.symbol}</span>
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded">
                Rank #{coin.market_cap_rank}
              </span>
            </div>
          </div>
        </div>

        {/* Price + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-card/60 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-bold text-white">{formatCurrency(md.current_price.usd)}</span>
              <span className={`text-lg font-semibold ${positive ? "text-green" : "text-red"}`}>
                {formatPercent(md.price_change_percentage_24h)}
              </span>
            </div>

            {/* Range selector */}
            <div className="flex gap-2 mb-4">
              {timeRanges.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedRange(r.days)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    selectedRange === r.days
                      ? "bg-accent text-primary-dark font-semibold"
                      : "bg-card border border-gray-700 text-gray-400 hover:border-accent"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="h-64">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={positive ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={positive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      domain={["auto", "auto"]}
                      tickFormatter={(v) => formatCurrency(v)}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value) => [formatCurrency(Number(value)), "Price"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={positive ? "#22c55e" : "#ef4444"}
                      fill="url(#colorPrice)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
              )}
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="space-y-4">
            {[
              { label: "Market Cap", value: formatCurrency(md.market_cap.usd) },
              { label: "24h Volume", value: formatCurrency(md.total_volume.usd) },
              { label: "Circulating Supply", value: md.circulating_supply?.toLocaleString() || "—" },
              { label: "Total Supply", value: md.total_supply?.toLocaleString() || "—" },
              { label: "Max Supply", value: md.max_supply?.toLocaleString() || "Unlimited" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/60 border border-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-white font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="bg-card/60 border border-gray-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">About {coin.name}</h2>
            <p className={`text-gray-400 leading-relaxed ${!descExpanded ? "line-clamp-4" : ""}`}>
              {description}
            </p>
            {description.length > 300 && (
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="flex items-center gap-1 text-accent text-sm mt-2 hover:underline"
              >
                {descExpanded ? "Show less" : "Read more"}
                {descExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {coin.links?.homepage?.[0] && (
            <a
              href={coin.links.homepage[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-gray-700 rounded-lg text-gray-300 hover:border-accent hover:text-accent transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Website
            </a>
          )}
          {coin.links?.repos_url?.github?.[0] && (
            <a
              href={coin.links.repos_url.github[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-gray-700 rounded-lg text-gray-300 hover:border-accent hover:text-accent transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
