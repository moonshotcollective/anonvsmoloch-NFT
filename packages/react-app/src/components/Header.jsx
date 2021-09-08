import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/moonshotcollective/anonvsmoloch-NFT" target="_blank" rel="noopener noreferrer">
      <PageHeader title="Anon VS Moloch" subTitle="Anon VS Moloch NFT Store" style={{ cursor: "pointer" }} />
    </a>
  );
}
