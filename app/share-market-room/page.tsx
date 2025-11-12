"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const TradingViewWidget = dynamic(() => import("@/components/TradingViewWidget"), { ssr: false });

export default function ShareMarketRoom() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          "/api/proxy?url=/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false"
        );
        setCoins(data);
      } catch (err) {
        console.error("Error fetching market data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-400 text-center">
        📊 Share Market Room – Live Charts
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="h-[300px] w-full bg-gray-800 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins.map((coin) => (
            <div key={coin.id} className="bg-gray-900 rounded-lg shadow p-3">
              <h2 className="text-lg font-semibold mb-2">
                {coin.name} ({coin.symbol.toUpperCase()})
              </h2>
              <TradingViewWidget symbol={coin.symbol.toUpperCase() + "USD"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
