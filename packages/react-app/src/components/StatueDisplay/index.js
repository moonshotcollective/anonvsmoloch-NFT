import React from "react";
import { Image } from "antd";

import "./StatueDisplay.css";
import ethbotStatue from "../../assets/ethbotStatue.png";
import fasfainfocircle2x from "../../assets/-fas-fa-info-circle@2x.svg";
import group339482x from "../../assets/group-33948@2x.svg";
import vector2x from "../../assets/vector@2x.svg";
import ethbotRectangle from "../../assets/rectangle-542@2x.png"

const Footer = () => {
  return (
	<div className="min-w-full bg-brown-dark-brown rectangle-1288" >
		<div className="flex flex-row">
			<div className="group-33937 m-12">
                <div className="title font-spacemono font-normal">Gitcoin Comics -Edition #2</div>
                  <div className="below-text">
                    Lorem Ipsum is simply dummy text of the printing and typesetting .Lorem Ipsum is simply dummy text.
                  </div>
                </div>
            
            <div className="group-33952">
              <div className="group-33949">
                <div className="group-33964">
                  <div className="group-33959">
                    <div className="overlap-group-2">
					              <img className="layer-2er-1" src={ethbotRectangle} />
					              <img className="layer-2er-1" src={ethbotStatue} />
                    </div>
                  </div>
                </div>
                <div className="overlap-group1">
                  <div className="group-33948">
                    <div className="eth-bot-statue">ETHBot Statue</div>
                    <div className="btn-1 border-1px-jungle-green">
                      <div className="x-eth">0.01 ETH</div>
                    </div>
                    <div className="text-6">
                      <span className="span0">Only 300 Available<br /></span>
                      <span className="span librefranklin-normal-bon-jour-22px">(</span>
                      <span className="span2">Next one will cost 2ETH</span>
                      <span className="span librefranklin-normal-bon-jour-22px">)</span>
                    </div>
                  </div>
                  <img className="fasfa-info-circle" src={fasfainfocircle2x} />
                </div>
              </div>
              <img className="group-33948-1 m-auto" src={group339482x} />
            </div>
			<div>
			</div>
            <img className="vector-1" src={vector2x} />
		</div>
	</div>
  );
};

export default Footer;
