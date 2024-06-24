//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Collection is ERC721URIStorage,Ownable{
    constructor() ERC721("GameItem", "ITM") {}

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // function mint(string memory url) public {
    //     _mint(msg.sender, tokenId);
    //     _setTokenURI(msg.sender,url);

    // }

    function mint(address player, string memory tokenURI)
        public onlyOwner
        returns (uint256) 
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}
