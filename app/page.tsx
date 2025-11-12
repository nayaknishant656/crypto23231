"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CoinList from "@/components/CoinList";
import TopMovers from "@/components/TopMovers";
import ProjectOfTheDay from "@/components/ProjectOfTheDay";

export default function HomePage() {
  return (
    <main className="space-y-8 p-4">
      <Header />
      <SearchBar onSearch={(query) => alert(`Search: ${query}`)} />
      <ProjectOfTheDay />
      <TopMovers />
      <CoinList />
    </main>
  );
}
