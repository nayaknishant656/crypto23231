"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MarketTable from "@/components/MarketTable";

const MarketInsightPage = () => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await axios.get("/api/coingecko", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      });
      setCoins(res.data);
      setFiltered(res.data);
      setLastUpdated(new Date().toLocaleString());
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    const result = coins.filter((coin: any) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, coins]);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-2">📊 Market Insight</h1>
      <p className="text-sm text-gray-400 mb-4">Last Updated: {lastUpdated}</p>
      <input
        className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <MarketTable data={filtered} />
    </div>
  );
};

export default MarketInsightPage;
