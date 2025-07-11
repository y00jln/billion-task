"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { FinancialAsset, BillionaireDetail } from "../domain/billionare";
import { getBillion } from "../api/getBillion";

export default function BillionaireDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [billionaire, setBillionaire] = useState<BillionaireDetail | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBillionaire() {
      try {
        const data = await getBillion(id);
        setBillionaire(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch billionaire details.");
      }
    }

    if (id) {
      fetchBillionaire();
    }
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!billionaire) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={billionaire.squareImage}
          alt={billionaire.name}
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{billionaire.name}</h1>
          <p className="text-gray-600">
            {billionaire.city}, {billionaire.state}, {billionaire.country}
          </p>
          <p className="text-green-600 font-semibold mt-2">
            Net Worth: ${billionaire.netWorth.toLocaleString()}M
          </p>
          <p className="text-sm text-gray-500">
            Position: #{billionaire.position}
          </p>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Industries</h2>
        <ul className="list-disc list-inside">
          {billionaire.industries.map((industry, idx) => (
            <li key={idx}>{industry}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        <ul className="list-disc list-inside space-y-1">
          {(billionaire.about ?? []).map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        <ul className="list-disc list-inside space-y-1">
          {billionaire.about?.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Financial Assets</h2>
        <div className="grid gap-4">
          {(billionaire.financialAssets ?? []).map(
            (asset: FinancialAsset, idx) => (
              <div
                key={idx}
                className="transition transform hover:scale-105 border rounded-lg p-4 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-1">
                  {asset.companyName} ({asset.ticker})
                </h3>
                <p className="text-gray-400">Exchange: {asset.exchange}</p>
                <p className="text-gray-400">
                  Shares: {asset.numberOfShares?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-gray-400">
                  Share Price: $
                  {asset.sharePrice !== undefined && asset.sharePrice !== null
                    ? asset.sharePrice.toFixed(2)
                    : "N/A"}
                </p>
                {asset.exerciseOptionPrice !== undefined && (
                  <p className="text-gray-400">
                    Option Price: ${asset.exerciseOptionPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-gray-400">
                  Current Price: $
                  {asset.currentPrice !== undefined &&
                  asset.currentPrice !== null
                    ? asset.currentPrice.toFixed(2)
                    : "N/A"}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
