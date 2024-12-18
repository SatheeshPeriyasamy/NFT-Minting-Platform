import React, { useState } from "react";
import { BrowserProvider } from "ethers";
import { toast } from "react-toastify";

const WalletConnect = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        toast.success("Wallet connected successfully!");
        onConnect(provider, signer, address);
      } catch (error) {
        console.error("Connection error:", error);
        toast.error("Failed to connect wallet.");
      }
    } else {
      toast.error("MetaMask is not installed!");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <button
        onClick={connectWallet}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
      >
        {walletAddress
          ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletConnect;
