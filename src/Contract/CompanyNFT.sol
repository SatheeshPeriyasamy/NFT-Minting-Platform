// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CompanyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    // Mapping for company metadata URIs by type (Gold, Silver, Bronze)
    mapping(string => mapping(string => string)) private _companyTypeURIs;

    // Admin management
    mapping(address => bool) private _admins;

    constructor() ERC721("CompanyNFT", "CNFT") Ownable(msg.sender) {
        _tokenIdCounter = 1;
        _admins[msg.sender] = true; // Contract owner is an admin by default
    }

    // Modifier to check admin role
    modifier onlyAdmin() {
        require(_admins[msg.sender], "Caller is not an admin");
        _;
    }

    // Function to set metadata URI for a specific company and type
    function setCompanyTypeURI(
        string memory company,
        string memory nftType,
        string memory uri
    ) external onlyAdmin {
        require(
            keccak256(abi.encodePacked(nftType)) ==
                keccak256(abi.encodePacked("Gold")) ||
                keccak256(abi.encodePacked(nftType)) ==
                keccak256(abi.encodePacked("Silver")) ||
                keccak256(abi.encodePacked(nftType)) ==
                keccak256(abi.encodePacked("Bronze")),
            "Invalid NFT type"
        );
        _companyTypeURIs[company][nftType] = uri;
    }

    // Function to mint NFT for a specific company and type
    function mintNFT(
        address to,
        string memory company,
        string memory nftType
    ) external {
        string memory uri = _companyTypeURIs[company][nftType];
        require(bytes(uri).length > 0, "Metadata not set for this company and type");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Function to grant admin role to another address (only callable by admins)
    function grantAdminRole(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        _admins[newAdmin] = true;
    }

    // Function to check if an address is an admin
    function isAdmin(address account) external view returns (bool) {
        return _admins[account];
    }
}
