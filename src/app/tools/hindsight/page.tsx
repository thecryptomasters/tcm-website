"use client";

import { useState } from "react";
import Image from "next/image";
import { Calculator, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const popularCoins = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "solana", name: "Solana" },
  { id: "cardano", name: "Cardano" },
  { id: "dogecoin", name: "Dogecoin" },
  { id: "polkadot", name: "Polkadot" },
  { id: "avalanche-2", name: "Avalanche" },
  { id: "chainlink", name: "Chainlink" },
  { id: "ripple", name: "XRP" },
  { id: "litecoin", name: "Litecoin" },
];

interface Result {
  startPrice: number;
  endPrice: number;
  coinsOwned: number;
  endValue: number;
  profitLoss: number;
  profitPercent: number;
  chartData: { date: string; price: number }[];
}

export default function HindsightPage() {
  const [coinId, setCoinId] = useState("bitcoin");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function calculate() {
    if (!startDate || !endDate || !amount || parseFloat(amount) <= 0) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const from = Math.floor(new Date(startDate).getTime() / 1000);
      const to = Math.floor(new Date(endDate).getTime() / 1000);

      if (from >= to) {
        setError("End date must be after start date.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
        { headers: { "Accept": "application/json", "x-cg-demo-api-key": "CG-DEMO" } }
      );
      const data = await res.json();

      if (!data.prices || data.prices.length < 2) {
        setError("No data available for this date range.");
        setLoading(false);
        return;
      }

      const startPrice = data.prices[0][1];
      const endPrice = data.prices[data.prices.length - 1][1];
      const investmentAmount = parseFloat(amount);
      const coinsOwned = investmentAmount / startPrice;
      const endValue = coinsOwned * endPrice;
      const profitLoss = endValue - investmentAmount;
      const profitPercent = ((endValue - investmentAmount) / investmentAmount) * 100;

      const step = Math.max(1, Math.floor(data.prices.length / 100));
      const chartData = data.prices
        .filter((_: [number, number], i: number) => i % step === 0 || i === data.prices.length - 1)
        .map(([time, price]: [number, number]) => ({
          date: new Date(time).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }),
          price,
        }));

      setResult({ startPrice, endPrice, coinsOwned, endValue, profitLoss, profitPercent, chartData });
    } catch {
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  }

  const positive = result ? result.profitLoss >= 0 : true;

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <Image
            src="/images/professor_hindsight.png"
            alt="Professor Hindsight"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Professor <span className="text-accent">Hindsight</span>
            </h1>
            <p className="text-gray-400">
              Ever wonder what your investment would be worth if you had bought earlier? Find out!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" />
              Profit Calculator
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Select Coin</label>
                <select
                  value={coinId}
                  onChange={(e) => setCoinId(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-accent"
                >
                  {popularCoins.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Investment Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1000"
                  min="0"
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent"
                />
              </div>

              {error && <p className="text-red text-sm">{error}</p>}

              <button
                onClick={calculate}
                disabled={loading}
                className="w-full py-3 bg-accent text-primary-dark font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {loading ? "Calculating..." : "Calculate"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Starting Price
                    </div>
                    <p className="text-white font-semibold">{formatCurrency(result.startPrice)}</p>
                  </div>
                  <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Ending Price
                    </div>
                    <p className="text-white font-semibold">{formatCurrency(result.endPrice)}</p>
                  </div>
                  <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <DollarSign className="w-3 h-3" />
                      End Value
                    </div>
                    <p className="text-white font-semibold">{formatCurrency(result.endValue)}</p>
                  </div>
                  <div className="bg-card/60 border border-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Profit / Loss
                    </div>
                    <p className={`font-semibold ${positive ? "text-green" : "text-red"}`}>
                      {positive ? "+" : ""}{formatCurrency(result.profitLoss)} ({result.profitPercent >= 0 ? "+" : ""}{result.profitPercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>

                {/* Sparkline */}
                {result.chartData.length > 0 && (
                  <div className="bg-card/60 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Price Over Period</p>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={result.chartData}>
                          <defs>
                            <linearGradient id="hindsightGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={positive ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={positive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                          <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrency(v)} width={70} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }}
                            formatter={(value) => [formatCurrency(Number(value)), "Price"]}
                          />
                          <Area type="monotone" dataKey="price" stroke={positive ? "#22c55e" : "#ef4444"} fill="url(#hindsightGrad)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!result && !loading && (
              <div className="bg-card/60 border border-gray-700/50 rounded-xl p-8 flex items-center justify-center h-full">
                <p className="text-gray-500 text-center">
                  Select a coin, date range, and investment amount to see your results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
