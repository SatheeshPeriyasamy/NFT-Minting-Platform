// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PriorityNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => string) private _priorityURIs;

    constructor() ERC721("PriorityNFT", "PNFT") Ownable(msg.sender) {
        _tokenIdCounter = 1; // Token ID starts at 1
    }

    // Set metadata URI for each priority level 
    function setPriorityURI(uint256 priorityLevel, string memory uri) external onlyOwner {
        _priorityURIs[priorityLevel] = uri;
    }

    // Mint NFT based on share value input
    function mintNFT(address to, uint256 shareValue) external {
        uint256 priorityLevel = getPriorityLevel(shareValue);
        require(bytes(_priorityURIs[priorityLevel]).length > 0, "Metadata not set for this priority");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _mint(to, tokenId);
        _setTokenURI(tokenId, _priorityURIs[priorityLevel]);
    }

    // Determine the priority level based on share value
    function getPriorityLevel(uint256 shareValue) public pure returns (uint256) {
        if (shareValue < 500) return 1;
        if (shareValue < 1000) return 2;
        if (shareValue < 5000) return 3;
        return 4;
    }
}
