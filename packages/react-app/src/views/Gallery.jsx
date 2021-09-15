/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-continue */
import React, { useState, useEffect } from "react";
import { Address } from "../components";
import { useContractReader, useEventListener } from "../hooks";

// Storefront view to show example nfts and nfts for sale...
const Gallery = ({ userAddress, writeContracts, readContracts, localChainId, tx, signer, localProvider }) => {
  return (
    <div>
      Hello, <Address adddress={userAddress} />
    </div>
  );
};

export default Gallery;
