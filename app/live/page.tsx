"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  current_price: number;
  symbol: string;
  image: string;
}

const LiveCryptoViewer = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get("/api/coingecko", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCoins(res.data);
        setError(null);
      } catch (err: any) {
        console.error("❌ Axios Error:", err.message);
        setError("Failed to load coins.");
      }
    };

    fetchCoins();
    const interval = setInterval(fetchCoins, 10000); // refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🔴 Live Crypto Viewer</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-900 p-4 rounded-lg shadow hover:bg-gray-800"
            >
              <div className="flex items-center space-x-4">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <p className="text-lg font-semibold">{coin.name}</p>
                  <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                  <p className="text-green-400 font-bold">
                    ${coin.current_price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveCryptoViewer;
