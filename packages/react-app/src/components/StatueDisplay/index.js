import React from "react";

import "./StatueDisplay.css";

import NftCard from "../NftCard";

import molochStatueNft from "../../assets/moloch-statue-nft.png"
import ethbotStatueNft from "../../assets/ethbot-statue-nft.png"

//Statue Image Side View
import molochStatue from "../../assets/Moloch_Angle_for_web.png";
import ethbotStatue from "../../assets/ETHBot_Angle_for_web.png";

import molochStatueFront from "../../assets/Moloch_Front_for_web.png";
import ethbotStatueFront from "../../assets/ETHBot_Front_for_web.png";

const Footer = () => {
  return (
      <section class="text-gray-600 body-font bg-brown-dark-brown">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4 justify-center">
            <div class="p-4 md:w-1/3">
              <div className="title font-spacemono font-normal">Gitcoin Comics -Edition #2</div>
              <div className="below-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting .Lorem Ipsum is simply dummy text.
              </div>
            </div>
            <div class="p-4 md:w-1/3">
                <NftCard
                  img={ethbotStatue}
                  width={300}
                  height={350}
                  title={'ETHBot Statue'}
                  soldout={0}
                  price={0.01}
                  token={'Eth'}
                  extraText={'Only 300 Available'}
                />
            </div>
            <div class="p-4 md:w-1/3">
                <NftCard
                  img={molochStatue}
                  width={300}
                  height={350}
                  title={'Moloch Statue'}
                  soldout={0}
                  price={0}
                  extraText={'(check the lasts)'}
                />
            </div>
          </div>
        </div>
      </section>
  );
};

export default Footer;
