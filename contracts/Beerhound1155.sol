pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract Beerhound1155 is ERC1155URIStorage {
    constructor () ERC1155(""){
        _mint(msg.sender, 1, 100, "");
        _setURI(1, "https://ipfs.io/ipfs/QmY5kTYABaDJmECtNHkVG6ydBne6vucrQGpKayvvmFtzdu?filename=metadata1155.json");
    }
}