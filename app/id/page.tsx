"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function CoinChartPage() {
  const { id } = useParams();
  const [prices, setPrices] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
        );
        const data = await res.json();
        setPrices(data.prices);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching chart:", e);
      }
    }
    if (id) fetchChartData();
  }, [id]);

  const chartData = {
    labels: prices.map((p) => new Date(p[0]).toLocaleTimeString()),
    datasets: [
      {
        label: `${id} Price (24h)`,
        data: prices.map((p) => p[1]),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold capitalize mb-4">{id} Chart</h1>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
}
