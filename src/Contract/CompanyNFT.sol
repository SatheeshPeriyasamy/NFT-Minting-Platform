// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CompanyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(string => string) private _companyURIs; // Mapping for company metadata URIs

    constructor() ERC721("CompanyNFT", "CNFT") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }

    // Set metadata URI for a specific company
    function setCompanyURI(string memory company, string memory uri) external onlyOwner {
        _companyURIs[company] = uri;
    }

    // Mint NFT based on the selected company
    function mintNFT(address to, string memory company) external {
        require(bytes(_companyURIs[company]).length > 0, "Metadata not set for this company");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _mint(to, tokenId);
        _setTokenURI(tokenId, _companyURIs[company]);
    }

    // Get the metadata URI for a specific company
    function getCompanyURI(string memory company) external view returns (string memory) {
        return _companyURIs[company];
    }
}
