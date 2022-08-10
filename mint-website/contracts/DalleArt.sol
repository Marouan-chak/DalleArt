// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DalleArt is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('DalleArt','DA'){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 7;
        maxPerWallet = 1;

    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId),'token does not exist');
        return string(abi.encodePacked(baseTokenUri,Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed');
    }

    function mint() public payable {
        require(isPublicMintEnabled, 'public mint is disabled');
        require(totalSupply + 1 <= maxSupply, 'max supply reached');
        require(msg.value == mintPrice , 'mint price is 0.02 ether');
        require(walletMints[msg.sender] == 0, 'NFT already minted');
        uint256 newTokenId = totalSupply + 1;
        totalSupply ++;
        walletMints[msg.sender] = 1;
        _safeMint(msg.sender, newTokenId);
    }
}