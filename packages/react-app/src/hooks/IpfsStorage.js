import { useState } from "react";

const ipfsAPI = require("ipfs-http-client");

const ipfsInfura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
const ipfs = ipfsAPI(ipfsInfura);

export default function useIpfsStorage() {
  // Set up IPFS api and go to town...
}
