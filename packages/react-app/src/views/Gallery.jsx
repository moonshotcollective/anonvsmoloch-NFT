/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-continue */
import React, { useState, useEffect } from "react";
import { Address } from "../components";
import { useContractReader, useEventListener } from "../hooks";

const { BufferList } = require("bl");
// https://www.npmjs.com/package/ipfs-http-client
const ipfsAPI = require("ipfs-http-client");

const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

const { ethers } = require("ethers");

let STARTING_JSON_NFT = {
  description: "",
  external_url: "", // <-- this can link to a page for the specific file too
  image: "",
  name: "",
  attributes: [
    // I believe you can have 21 attr.
    {
      trait_type: "",
      value: "",
    },
  ],
};

// Storefront view to show example nfts and nfts for sale...
const Gallery = ({ userAddress, writeContracts, readContracts, localChainId, tx, signer, localProvider }) => {
  const [yourJSON, setYourJSON] = useState(STARTING_JSON_NFT);
  const [sending, setSending] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [ipfsDownHash, setIpfsDownHash] = useState();

  const [downloading, setDownloading] = useState();
  const [ipfsContent, setIpfsContent] = useState();

  const [transferToAddresses, setTransferToAddresses] = useState({});

  // helper function to "Get" from IPFS
  // you usually go content.toString() after this...
  const getFromIPFS = async hashToGet => {
    for await (const file of ipfs.get(hashToGet)) {
      console.log(file.path);
      if (!file.content) continue;
      const content = new BufferList();
      for await (const chunk of file.content) {
        content.append(chunk);
      }
      console.log(content);
      return content;
    }
  };

  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader(readContracts, "YourCollectible", "balanceOf", [userAddress]);
  console.log("🤗 balance:", balance);

  // 📟 Listen for broadcast events
  const transferEvents = useEventListener(readContracts, "YourCollectible", "Transfer", localProvider, 1);
  console.log("📟 Transfer events:", transferEvents);

  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const yourBalance = balance && balance.toNumber && balance.toNumber();
  const [yourCollectibles, setYourCollectibles] = useState();
  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("Getting token index", tokenIndex);
          const tokenId = await readContracts.YourCollectible.tokenOfOwnerByIndex(userAddress, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts.YourCollectible.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          console.log("ipfsHash", ipfsHash);

          const jsonManifestBuffer = await getFromIPFS(ipfsHash);

          try {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            console.log("jsonManifest", jsonManifest);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: userAddress, ...jsonManifest });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [userAddress, yourBalance, balance, readContracts, localChainId]);

  return (
    <div>
      Hello, <Address adddress={userAddress} />
    </div>
  );
};

export default Gallery;
