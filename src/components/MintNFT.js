import React, { useState, useEffect } from "react";
import { Contract } from "ethers";
import contractABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { toast } from "react-toastify";

const STOCK_SYMBOLS = ["AAPL", "MSFT", "TSLA"]; // Apple, Microsoft, Tesla
const FINNHUB_API_KEY = "cthge9hr01qtho2pfco0cthge9hr01qtho2pfcog";

const MintNFT = ({ provider, signer, walletAddress }) => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Stock Prices from Finnhub
  const fetchStockPrices = async () => {
    try {
      setLoading(true); // Show loading state
      const promises = STOCK_SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );
        const data = await response.json();

        // Check if data exists
        if (!data || !data.c) {
          console.error(`No data for symbol: ${symbol}`, data);
          return { symbol, price: 0, timestamp: "N/A" }; // Default values if API fails
        }

        return {
          symbol,
          price: parseFloat(data.c), // Current price
          timestamp: new Date().toLocaleString(), // Current timestamp
        };
      });

      const results = await Promise.all(promises);
      results.sort((a, b) => b.price - a.price); // Sort by price descending
      setStockData(results);
      setLoading(false); // Hide loading state
    } catch (error) {
      console.error("Error fetching stock prices:", error);
      toast.error("Failed to fetch stock prices. Please try again later.");
      setLoading(false); // Hide loading state
    }
  };

  // Mint NFT for a given rank
  const mintPriorityNFT = async (rank) => {
    if (!stockData.length) {
      toast.error("Stock data is not available yet!");
      return;
    }

    let priority = "";
    if (rank === 1) priority = "Gold";
    else if (rank === 2) priority = "Silver";
    else if (rank === 3) priority = "Bronze";

    try {
      const company = stockData[rank - 1]; // Get the company by rank
      if (company.price === 0) {
        toast.error(`Cannot mint ${priority} NFT as data for ${company.symbol} is unavailable.`);
        return;
      }

      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.mintNFT(walletAddress, priority);
      toast.info(`Minting ${priority} NFT for ${company.symbol}...`);
      await tx.wait();
      toast.success(`${priority} NFT minted for ${company.symbol}!`);
    } catch (error) {
      console.error("Minting failed:", error);
      toast.error("Failed to mint NFT.");
    }
  };

  // Fetch stock prices on mount and every 10 seconds
  useEffect(() => {
    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 120000); // Refresh every 2 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold">Top Companies - Real-Time Stock Prices</h2>

      {loading && <p className="text-gray-600">Loading stock prices...</p>}

      {/* Display Company Containers */}
      {stockData.map((company, index) => (
        <div
          key={company.symbol}
          className="flex justify-between items-center border p-4 rounded-md"
        >
          <span className="text-lg font-semibold">
            {index + 1}. {company.symbol} - $
            {company.price > 0 ? company.price.toFixed(2) : "N/A"}
          </span>
          <span className="text-sm text-gray-500">Last updated: {company.timestamp}</span>
        </div>
      ))}

      {/* Mint NFT Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => mintPriorityNFT(1)}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
        >
          Mint Gold NFT
        </button>
        <button
          onClick={() => mintPriorityNFT(2)}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          Mint Silver NFT
        </button>
        <button
          onClick={() => mintPriorityNFT(3)}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
        >
          Mint Bronze NFT
        </button>
      </div>
    </div>
  );
};

export default MintNFT;
