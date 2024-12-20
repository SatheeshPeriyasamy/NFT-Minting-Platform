// import React, { useState } from "react";
// import WalletConnect from "./components/WalletConnect";
// import AdminPanel from "./components/AdminPanel";
// import MintNFT from "./components/MintNFT";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";


// const App = () => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [walletAddress, setWalletAddress] = useState("");

//   const handleWalletConnect = (provider, signer, address) => {
//     setProvider(provider);
//     setSigner(signer);
//     setWalletAddress(address);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 space-y-8">
//       <ToastContainer />
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-800">
//         Priority NFT Minting Platform
//       </h1>

//       {/* Wallet Connect */}
//       <div className="w-full max-w-md">
//         <WalletConnect onConnect={handleWalletConnect} />
//       </div>

//       {/* Conditionally Render Components Based on Wallet Connection */}
//       {walletAddress ? (
//         <div className="w-full flex flex-col lg:flex-row lg:space-x-8 items-center justify-center space-y-8 lg:space-y-0">
//           {/* Admin Panel */}
//           <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//              <AdminPanel provider={provider} signer={signer} />
//           </div>

//           {/* Mint NFT */}
//           <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//             <MintNFT provider={provider} signer={signer} walletAddress={walletAddress} />
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600">
//           Please connect your wallet to access the Admin Panel and Mint NFT features.
//         </p>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import AdminPanel from "./components/AdminPanel";
import MintNFT from "./components/MintNFT";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  const handleWalletConnect = (provider, signer, address) => {
    setProvider(provider);
    setSigner(signer);
    setWalletAddress(address);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 space-y-8">
      <ToastContainer theme="dark" />
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-white">
        Priority NFT Minting Platform on Polygon Mainnet
      </h1>

      {/* Wallet Connect */}
      <div className="w-full max-w-md">
        <WalletConnect onConnect={handleWalletConnect} />
      </div>

      {/* Conditionally Render Components Based on Wallet Connection */}
      {walletAddress ? (
        <div className="w-full flex flex-col lg:flex-row lg:space-x-8 items-center justify-center space-y-8 lg:space-y-0">
          {/* Admin Panel */}
          <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
            <AdminPanel provider={provider} signer={signer} />
          </div>

          {/* Mint NFT */}
          <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
            <MintNFT
              provider={provider}
              signer={signer}
              walletAddress={walletAddress}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-400">
          Please connect your wallet and switch your network to Polygon Mainnet to access the Admin Panel and Mint NFT features. 
          
        </p>
      )}
    </div>
  );
};

export default App;
