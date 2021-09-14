/* eslint-disable no-unused-vars */
const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

// Tests for minting nfts from YourCollectable.sol
describe("Anon VS Moloch", function () {
  let collectableContract;

  // YourCollectable.sol NFT contract
  describe("YourCollectable", function () {
    it("Should deploy YourCollectable", async function () {
      const YourCollectable = await ethers.getContractFactory("YourContract");

      collectableContract = await YourCollectable.deploy();
    });

    // Mint NFT test
    describe("mintItem()", function () {
      it("Should be able to mint a new NFT and return the id", async function () {
        // todo: write the test...
      });
    });
  });
});
