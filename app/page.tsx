"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBillions } from "./api/getBillion";
import { billionaries } from "./domain/billionaries";

export default function Home() {
  const [billions, setBillions] = useState<billionaries[]>([]);
  const router = useRouter();

  const handleBillionClick = (id: string) => {
    router.push(`${id}`);
  };

  useEffect(() => {
    async function fetchBillions() {
      const data = await getBillions();
      console.log("Fetched billions data:", data);
      setBillions(data);
    }
    fetchBillions();
  }, []);

  if (billions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-shadow-zinc-800 text-neutral-500 drop-shadow-md">
        Billionaires
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {billions.map((billionaire) => (
          <div
            key={billionaire.id}
            onClick={() => handleBillionClick(billionaire.id)}
            className="bg-white rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl p-6 flex flex-col items-center"
          >
            <img
              src={billionaire.squareImage ?? "-"}
              alt={billionaire.name ?? "-"}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
              {billionaire.name ?? "-"}
            </h2>
            <p className="text-gray-600 text-center">
              ${billionaire.netWorth.toLocaleString()}M
            </p>
            <p className="text-gray-500 text-sm text-center mt-2">
              {billionaire.industries.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
