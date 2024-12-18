// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PriorityNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(string => string) private _priorityURIs; // Priority level to IPFS URI mapping

    constructor() ERC721("PriorityNFT", "PNFT") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }

    // Set metadata URI for Gold, Silver, and Bronze priorities
    function setPriorityURI(string memory priority, string memory uri) external onlyOwner {
        _priorityURIs[priority] = uri;
    }

    // Mint NFT based on the top company's priority
    function mintNFT(address to, string memory priority) external {
        require(bytes(_priorityURIs[priority]).length > 0, "Metadata not set for this priority");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _mint(to, tokenId);
        _setTokenURI(tokenId, _priorityURIs[priority]);
    }
}
