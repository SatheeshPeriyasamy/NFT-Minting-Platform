// import React, { useState } from "react";
// import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/ipfs";
// import { Contract } from "ethers";
// import contractABI from "../utils/contractABI.json";
// import { CONTRACT_ADDRESS } from "../utils/constants";
// import { toast } from "react-toastify";

// const AdminPanel = ({ provider, signer }) => {
//   const [file, setFile] = useState(null);
//   const [metadata, setMetadata] = useState({ name: "", description: "" });
//   const [priority, setPriority] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleFileUpload = async () => {
//     if (!file || !metadata.name || !metadata.description || !priority) {
//       toast.error("Please provide all required inputs!");
//       return;
//     }

//     try {
//       setUploading(true);
//       const fileURI = await uploadFileToIPFS(file); // Upload file to IPFS
//       const metadataWithFile = {
//         ...metadata,
//         image: fileURI, // Add image URI to metadata
//       };
//       const metadataURI = await uploadJSONToIPFS(metadataWithFile); // Upload metadata JSON to IPFS

//       const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
//       const tx = await contract.setPriorityURI(priority, metadataURI); // Set URI on the smart contract
//       toast.info("Setting priority URI...");
//       await tx.wait();

//       toast.success(`Priority ${priority} URI set successfully!`);
//       setUploading(false);
//     } catch (error) {
//       console.error("Error uploading to IPFS or setting URI:", error);
//       toast.error("Failed to set priority URI.");
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-6 p-6 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold">Admin Panel - Set Priority NFTs</h2>

//       {/* File Upload */}
//       <div className="space-y-4">
//         <h3 className="font-semibold">Upload NFT Metadata</h3>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border p-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Enter NFT Name"
//           value={metadata.name}
//           onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
//           className="w-full p-2 border rounded-md"
//         />
//         <textarea
//           placeholder="Enter NFT Description"
//           value={metadata.description}
//           onChange={(e) =>
//             setMetadata({ ...metadata, description: e.target.value })
//           }
//           className="w-full p-2 border rounded-md"
//         />
//         <select
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//           className="w-full p-2 border rounded-md"
//         >
//           <option value="">Select Priority</option>
//           <option value="Gold">Gold</option>
//           <option value="Silver">Silver</option>
//           <option value="Bronze">Bronze</option>
//         </select>
//         <button
//           onClick={handleFileUpload}
//           disabled={uploading}
//           className={`px-4 py-2 rounded-md text-white ${
//             uploading
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {uploading ? "Uploading..." : "Upload Metadata & Set Priority"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

// ----------------------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/ipfs";
// import { Contract } from "ethers";
// import contractABI from "../utils/contractABI.json";
// import { CONTRACT_ADDRESS } from "../utils/constants";
// import { toast } from "react-toastify";

// const AdminPanel = ({ provider, signer }) => {
//   const [file, setFile] = useState(null);
//   const [metadata, setMetadata] = useState({ name: "", description: "" });
//   const [company, setCompany] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleFileUpload = async () => {
//     if (!file || !metadata.name || !metadata.description || !company) {
//       toast.error("Please provide all required inputs!");
//       return;
//     }

//     try {
//       setUploading(true);
//       const fileURI = await uploadFileToIPFS(file); // Upload image to IPFS
//       const metadataWithFile = {
//         ...metadata,
//         image: fileURI, // Add image URI to metadata
//       };
//       const metadataURI = await uploadJSONToIPFS(metadataWithFile); // Upload metadata JSON to IPFS

//       // Interact with the smart contract
//       const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
//       const tx = await contract.setCompanyURI(company, metadataURI); // Set URI for the company
//       toast.info("Setting company URI...");
//       await tx.wait();

//       toast.success(`Metadata URI set for ${company} successfully!`);
//       setUploading(false);
//     } catch (error) {
//       console.error("Error uploading to IPFS or setting URI:", error);
//       toast.error("Failed to set company URI.");
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 bg-gray-900 text-white rounded-md shadow-md">
//       <h2 className="text-2xl font-bold">Admin Panel - Manage Company NFTs</h2>

//       {/* File Upload Section */}
//       <div className="space-y-4">
//         <h3 className="font-semibold text-lg">Upload NFT Metadata</h3>

//         {/* File Input */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-gray-400">Upload Image File:</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
//           />
//         </div>

//         {/* NFT Name Input */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-gray-400">NFT Name:</label>
//           <input
//             type="text"
//             placeholder="Enter NFT Name"
//             value={metadata.name}
//             onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
//             className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
//           />
//         </div>

//         {/* NFT Description Input */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-gray-400">NFT Description:</label>
//           <textarea
//             placeholder="Enter NFT Description"
//             value={metadata.description}
//             onChange={(e) =>
//               setMetadata({ ...metadata, description: e.target.value })
//             }
//             className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
//           ></textarea>
//         </div>

//         {/* Company Selection */}
//         <div className="flex flex-col space-y-2">
//           <label className="text-gray-400">Select Company:</label>
//           <select
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
//           >
//             <option value="">Select Company</option>
//             <option value="AAPL">Apple</option>
//             <option value="MSFT">Microsoft</option>
//             <option value="TSLA">Tesla</option>
//           </select>
//         </div>

//         {/* Upload Button */}
//         <button
//           onClick={handleFileUpload}
//           disabled={uploading}
//           className={`w-full px-4 py-2 mt-4 rounded-md text-white ${
//             uploading
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {uploading ? "Uploading..." : "Upload Metadata & Set Company"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

// ----------------------------------------------------------------------------------------------------------------------------------------


import React, { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/ipfs";
import { Contract } from "ethers";
import contractABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { toast } from "react-toastify";

const AdminPanel = ({ provider, signer }) => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ name: "", description: "" });
  const [company, setCompany] = useState("");
  const [nftType, setNftType] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload metadata and set company and type URI
  const handleFileUpload = async () => {
    if (!file || !metadata.name || !metadata.description || !company || !nftType) {
      toast.error("Please provide all required inputs!");
      return;
    }

    try {
      setUploading(true);
      const fileURI = await uploadFileToIPFS(file); // Upload image to IPFS
      const metadataWithFile = {
        ...metadata,
        image: fileURI, // Add image URI to metadata
      };
      const metadataURI = await uploadJSONToIPFS(metadataWithFile); // Upload metadata JSON to IPFS

      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      const tx = await contract.setCompanyTypeURI(company, nftType, metadataURI);
      toast.info("Setting metadata for company and type...");
      await tx.wait();

      toast.success(`Metadata set for ${company} (${nftType}) successfully!`);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading metadata:", error);
      toast.error("Failed to set metadata.");
      setUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold">Admin Panel - Manage Company NFTs</h2>

      {/* File Upload Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Upload NFT Metadata</h3>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Enter NFT Name"
          value={metadata.name}
          onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        />
        <textarea
          placeholder="Enter NFT Description"
          value={metadata.description}
          onChange={(e) =>
            setMetadata({ ...metadata, description: e.target.value })
          }
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        ></textarea>
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        >
          <option value="">Select Company</option>
          <option value="AAPL">Apple</option>
          <option value="MSFT">Microsoft</option>
          <option value="TSLA">Tesla</option>
        </select>
        <select
          value={nftType}
          onChange={(e) => setNftType(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        >
          <option value="">Select NFT Type</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <button
          onClick={handleFileUpload}
          disabled={uploading}
          className={`w-full px-4 py-2 rounded-md text-white ${
            uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Metadata"}
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
