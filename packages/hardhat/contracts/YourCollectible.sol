pragma solidity >=0.6.0 <0.7.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

/// @notice NFT contract for Anon vs Molock NFT's
/// @dev ?? do we want to have separate contracts for each ^^ ??
contract YourCollectible is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor()
    public
    ERC721("ANONvsMOLOCH", "ANONvsMOLOCH")
  {
    _setBaseURI("https://ipfs.io/ipfs/");
  }

  /// @notice mint function for minting nft
  /// @dev mints nft by only the owner
  /// @param to who will receive the nft after minting
  /// @param tokenURI will be an ipfs hash
  /// @return the id of the minted nft
  function mintItem(address to, string memory tokenURI)
      public
      onlyOwner
      returns (uint256)
  {
      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(to, id);
      _setTokenURI(id, tokenURI);

      return id;
  }
}
