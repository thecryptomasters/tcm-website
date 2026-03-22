export interface CoinAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface CoinCapResponse {
  data: CoinAsset[];
  timestamp: number;
}

export interface CoinCapSingleResponse {
  data: CoinAsset;
  timestamp: number;
}

export interface CoinCapHistoryPoint {
  priceUsd: string;
  time: number;
  date: string;
}

export interface CoinCapHistoryResponse {
  data: CoinCapHistoryPoint[];
  timestamp: number;
}

export interface CoinGeckoMarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  sparkline_in_7d?: { price: number[] };
  total_supply: number | null;
  max_supply: number | null;
  circulating_supply: number;
}

export interface CoinGeckoDetail {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { large: string; small: string; thumb: string };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number;
  };
  links: {
    homepage: string[];
    repos_url: { github: string[] };
  };
}

export interface CoinGeckoChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface PodcastEpisode {
  slug: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  image?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeUrl?: string;
  podbeanUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

export interface CoinGeckoGlobal {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: { usd: number };
    market_cap_percentage: { btc: number };
  };
}
