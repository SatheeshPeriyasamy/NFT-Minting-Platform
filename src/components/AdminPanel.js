import React, { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/ipfs";
import { Contract } from "ethers";
import contractABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { toast } from "react-toastify";

const AdminPanel = ({ provider, signer }) => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ name: "", description: "" });
  const [priority, setPriority] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async () => {
    if (!file || !metadata.name || !metadata.description || !priority) {
      toast.error("Please provide all required inputs!");
      return;
    }

    try {
      setUploading(true);
      const fileURI = await uploadFileToIPFS(file); // Upload file to IPFS
      const metadataWithFile = {
        ...metadata,
        image: fileURI, // Add image URI to metadata
      };
      const metadataURI = await uploadJSONToIPFS(metadataWithFile); // Upload metadata JSON to IPFS

      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.setPriorityURI(priority, metadataURI); // Set URI on the smart contract
      toast.info("Setting priority URI...");
      await tx.wait();

      toast.success(`Priority ${priority} URI set successfully!`);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading to IPFS or setting URI:", error);
      toast.error("Failed to set priority URI.");
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">Admin Panel - Set Priority NFTs</h2>

      {/* File Upload */}
      <div className="space-y-4">
        <h3 className="font-semibold">Upload NFT Metadata</h3>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter NFT Name"
          value={metadata.name}
          onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
        <textarea
          placeholder="Enter NFT Description"
          value={metadata.description}
          onChange={(e) =>
            setMetadata({ ...metadata, description: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Priority</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <button
          onClick={handleFileUpload}
          disabled={uploading}
          className={`px-4 py-2 rounded-md text-white ${
            uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Metadata & Set Priority"}
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
