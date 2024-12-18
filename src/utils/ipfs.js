// import axios from "axios";


// // Pinata API credentials
// const PINATA_API_KEY = "584963cadc36f0aba02f";
// const PINATA_API_SECRET = "dbf19986e15a122f19e50a03b755bc77290c4b1c0ef67e6c8871be5c2f0249c0";

// // Upload file to Pinata
// export const uploadFileToIPFS = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         pinata_api_key: PINATA_API_KEY,
//         pinata_secret_api_key: PINATA_API_SECRET,
//       },
//     });
//     return `ipfs://${response.data.IpfsHash}`;
//   } catch (error) {
//     console.error("File upload failed:", error);
//     throw new Error("Failed to upload file to IPFS.");
//   }
// };

// // Upload JSON metadata to Pinata
// export const uploadJSONToIPFS = async (metadata) => {
//   try {
//     const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
//       headers: {
//         pinata_api_key: PINATA_API_KEY,
//         pinata_secret_api_key: PINATA_API_SECRET,
//       },
//     });
//     return `ipfs://${response.data.IpfsHash}`;
//   } catch (error) {
//     console.error("Metadata upload failed:", error);
//     throw new Error("Failed to upload JSON to IPFS.");
//   }
// };


// Pinata API credentials
const PINATA_API_KEY = "584963cadc36f0aba02f";
const PINATA_API_SECRET = "dbf19986e15a122f19e50a03b755bc77290c4b1c0ef67e6c8871be5c2f0249c0";

// Upload file to Pinata
export const uploadFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to IPFS");
    }

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error("Failed to upload file to IPFS.");
  }
};

// Upload JSON metadata to Pinata
export const uploadJSONToIPFS = async (metadata) => {
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error("Failed to upload JSON to IPFS");
    }

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error("Metadata upload failed:", error);
    throw new Error("Failed to upload JSON to IPFS.");
  }
};
