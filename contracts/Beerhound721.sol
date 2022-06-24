pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Beerhound721 is ERC721URIStorage {

    address private _owner;

    constructor () ERC721("Beerhound721", "BRHND721"){
        _owner = msg.sender;
        _safeMint(msg.sender, 1);
        _setTokenURI(1, "https://ipfs.io/ipfs/QmedkKVVNQNJg2hANtsReCv6tEaTE34uAZKv2sxjyFvvJd?filename=metadata.json");
    }

    function mint(address to, uint256 tokenId) public virtual {
        require (_owner == to, "Not owner");
        require (to != address(0));

        _safeMint(to, tokenId);
    }
}