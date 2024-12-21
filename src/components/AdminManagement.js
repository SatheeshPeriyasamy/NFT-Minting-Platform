import React, { useState } from "react";
import { Contract } from "ethers";
import contractABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { toast } from "react-toastify";

const AdminManagement = ({ provider, signer }) => {
  const [newAdmin, setNewAdmin] = useState("");
  const [loading, setLoading] = useState(false);

  // Grant Admin Role
  const handleGrantAdmin = async () => {
    if (!newAdmin) {
      toast.error("Please provide a valid address!");
      return;
    }

    try {
      setLoading(true);
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.grantAdminRole(newAdmin); // Call grantAdminRole from the contract
      toast.info("Granting admin rights...");
      await tx.wait();

      toast.success(`Admin rights granted to ${newAdmin}!`);
      setNewAdmin("");
      setLoading(false);
    } catch (error) {
      console.error("Error granting admin rights:", error);
      toast.error("Failed to grant admin rights.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold">Admin Management</h2>
      <div className="flex flex-col space-y-4">
        <label className="text-gray-400">
          Enter Address to Grant Admin Rights:
        </label>
        <input
          type="text"
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
          placeholder="Enter wallet address"
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        />
        <button
          onClick={handleGrantAdmin}
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Granting Admin Rights..." : "Grant Admin Rights"}
        </button>
      </div>
    </div>
  );
};

export default AdminManagement;
