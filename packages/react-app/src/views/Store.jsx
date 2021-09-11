import React from "react";
import { Address } from "../components";

const { ethers } = require("ethers");

let STARTING_JSON_NFT = {
  description: "",
  external_url: "", // <-- this can link to a page for the specific file too
  image: "",
  name: "",
  attributes: [
    {
      trait_type: "",
      value: "",
    },
  ],
};

const Store = ({ userAddress }) => {
  return (
    <div>
      Hello, <Address adddress={userAddress} />
    </div>
  );
};

export default Store;
