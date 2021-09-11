import { PageHeader, Image } from "antd";
import React from "react";
import anonvsmolochlogo from "../assets/anonvsmolochlogo.svg";

// displays a page header

export default function Header() {
  return (
    <a
      href="https://github.com/moonshotcollective/anonvsmoloch-NFT"
      target="_blank"
      rel="noopener noreferrer"
      style={{ margin: 10, float: "left" }}
    >
      <Image width={200} src={anonvsmolochlogo} />
    </a>
  );
}
