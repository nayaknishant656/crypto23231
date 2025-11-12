"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const COLORS = ["#6366f1", "#22d3ee", "#38bdf8", "#facc15"];

const MOCK_ALLOCATION = [
  { name: "NFTs", value: 75.63 },
  { name: "Wallet", value: 23.99 },
  { name: "Kelp", value: 0.38 },
  { name: "Aave V3", value: 0.01 },
];

const MOCK_BREAKDOWN = [
  { name: "NFTs", share: "75.63%", value: "$1,564,859.76" },
  { name: "Wallet", share: "23.99%", value: "$496,273.06" },
  { name: "Kelp", share: "0.38%", value: "$7,836.23" },
  { name: "Aave V3", share: "<0.01%", value: "$3.53" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">📊 Portfolio Overview</h1>
      </div>

      {/* Summary Card */}
      <Card className="bg-[#1e1e22] text-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-gray-400">Net Worth</p>
              <h2 className="text-3xl font-bold">$2,068,973</h2>
              <p className="text-red-500">- $1,452,654 (-41.23%)</p>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-gray-400">Total Assets</p>
              <p>$2,068,973</p>
              <p className="text-gray-400 mt-2">Total Liabilities</p>
              <p>$0</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-400">Risk Profile</p>
            <div className="w-full h-3 bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div className="bg-blue-500 h-full w-[71%] inline-block"></div>
              <div className="bg-purple-500 h-full w-[24%] inline-block"></div>
              <div className="bg-teal-500 h-full w-[5%] inline-block"></div>
              <div className="bg-yellow-400 h-full w-[0.5%] inline-block"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allocation Pie Chart */}
      <Card className="bg-[#1e1e22] text-white mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Protocol Allocation</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <PieChart width={250} height={250}>
              <Pie
                data={MOCK_ALLOCATION}
                cx={125}
                cy={125}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {MOCK_ALLOCATION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div>
              {MOCK_ALLOCATION.map((entry, index) => (
                <p key={entry.name} className="mb-1">
                  <span
                    className={cn("inline-block w-3 h-3 rounded-full mr-2", {
                      "bg-indigo-500": index === 0,
                      "bg-cyan-400": index === 1,
                      "bg-sky-400": index === 2,
                      "bg-yellow-400": index === 3,
                    })}
                  ></span>
                  {entry.name}: {entry.value}%
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Table */}
      <Card className="bg-[#1e1e22] text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Protocol Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 font-semibold text-gray-400 border-b border-gray-700 pb-2">
            <p>Name</p>
            <p>Share</p>
            <p className="text-right">Value</p>
          </div>
          {MOCK_BREAKDOWN.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-3 gap-4 py-2 border-b border-gray-800 text-white"
            >
              <p>{row.name}</p>
              <p>{row.share}</p>
              <p className="text-right">{row.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
