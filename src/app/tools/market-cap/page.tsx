"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CoinOption {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  circulating_supply: number;
}

const STABLECOINS = ["tether", "usd-coin", "dai", "busd", "frax", "tusd", "usdd", "paxos-standard"];

export default function MarketCapPage() {
  const [coins, setCoins] = useState<CoinOption[]>([]);
  const [baseCoin, setBaseCoin] = useState("");
  const [compareCoin, setCompareCoin] = useState("");
  const [baseSearch, setBaseSearch] = useState("");
  const [compareSearch, setCompareSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
      } catch {
        // ignore
      }
      setLoading(false);
    }
    fetchCoins();
  }, []);

  const base = coins.find((c) => c.id === baseCoin);
  const compare = coins.find((c) => c.id === compareCoin);

  const isStablecoin = base ? STABLECOINS.includes(base.id) : false;

  let hypotheticalPrice: number | null = null;
  let multiplier: number | null = null;

  if (base && compare && base.circulating_supply > 0) {
    hypotheticalPrice = compare.market_cap / base.circulating_supply;
    multiplier = hypotheticalPrice / base.current_price;
  }

  const filteredBase = coins.filter(
    (c) => c.name.toLowerCase().includes(baseSearch.toLowerCase()) || c.symbol.toLowerCase().includes(baseSearch.toLowerCase())
  );
  const filteredCompare = coins.filter(
    (c) => c.name.toLowerCase().includes(compareSearch.toLowerCase()) || c.symbol.toLowerCase().includes(compareSearch.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <Image
            src="/images/priceAtMarketCap.png"
            alt="Price at Market Cap"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Price at <span className="text-accent">Market Cap</span>
            </h1>
            <p className="text-gray-400">
              What would a coin&apos;s price be if it had another coin&apos;s market cap?
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coin Selection */}
            <div className="space-y-6">
              {/* Base Coin */}
              <div className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Base Coin</h3>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search coins..."
                    value={baseSearch}
                    onChange={(e) => setBaseSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent text-sm"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredBase.slice(0, 30).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setBaseCoin(c.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        baseCoin === c.id ? "bg-accent/20 text-accent" : "text-gray-300 hover:bg-primary/30"
                      }`}
                    >
                      {c.image && <Image src={c.image} alt={c.name} width={20} height={20} className="rounded-full" unoptimized />}
                      <span>{c.name}</span>
                      <span className="text-gray-500 uppercase text-xs ml-auto">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compare Coin */}
              <div className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Compare Market Cap Of</h3>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search coins..."
                    value={compareSearch}
                    onChange={(e) => setCompareSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent text-sm"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredCompare.slice(0, 30).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCompareCoin(c.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                        compareCoin === c.id ? "bg-accent/20 text-accent" : "text-gray-300 hover:bg-primary/30"
                      }`}
                    >
                      {c.image && <Image src={c.image} alt={c.name} width={20} height={20} className="rounded-full" unoptimized />}
                      <span>{c.name}</span>
                      <span className="text-gray-500 uppercase text-xs ml-auto">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div>
              {base && compare && hypotheticalPrice !== null && multiplier !== null ? (
                <div className="bg-card/60 backdrop-blur border border-gray-700/50 rounded-xl p-8">
                  {isStablecoin && (
                    <div className="mb-4 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-accent text-sm">
                      Note: {base.name} is a stablecoin. Results may not be meaningful.
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="text-center">
                      {base.image && <Image src={base.image} alt={base.name} width={48} height={48} className="rounded-full mx-auto mb-2" unoptimized />}
                      <p className="text-white font-semibold">{base.name}</p>
                      <p className="text-gray-500 text-sm">{formatCurrency(base.current_price)}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-accent" />
                    <div className="text-center">
                      {compare.image && <Image src={compare.image} alt={compare.name} width={48} height={48} className="rounded-full mx-auto mb-2" unoptimized />}
                      <p className="text-white font-semibold">{compare.name}</p>
                      <p className="text-gray-500 text-sm">Market Cap: {formatCurrency(compare.market_cap)}</p>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      If {base.name} had {compare.name}&apos;s market cap, it would be worth:
                    </p>
                    <p className="text-4xl font-bold text-accent">{formatCurrency(hypotheticalPrice)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1a1a2e] rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Multiplier</p>
                      <p className={`text-xl font-bold ${multiplier >= 1 ? "text-green" : "text-red"}`}>
                        {multiplier.toFixed(2)}x
                      </p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Current Price</p>
                      <p className="text-xl font-bold text-white">{formatCurrency(base.current_price)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card/60 border border-gray-700/50 rounded-xl p-8 flex items-center justify-center h-full">
                  <p className="text-gray-500 text-center">
                    Select a base coin and a comparison coin to see results.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
