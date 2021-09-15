import React from 'react'

import bg1x from "../../assets/bg@1x.svg";
import fasfainfocircle12x from "../../assets/-fas-fa-info-circle-1@2x.svg";
import group339661x from "../../assets/group-33966@1x.svg";
import star32x from "../../assets/star-3@2x.svg";
import star22x from "../../assets/star-2@2x.svg";
import group3395712x from "../../assets/group-33957-1@2x.svg";
import vector2x from "../../assets/vector@2x.svg";

const NftForSale = () => {
	return (
		<div>
		<div className="overlap-group2">
            <img className="bg" src={bg1x} />
            <div className="rectangle-1328"></div>
            <div className="text-7">(75% proceeds go to Gitcoin Grants, 25=&gt; Artist)</div>
            <div className="group-33968">
              <div className="group-33951">
                <div className="group-33964-1"><img className="group-33957" src={group3395712x} /></div>
                <div className="overlap-group-3">
                  <div className="group-15151">
                    <div className="eth-bot-statue-1">ETHBot Statue</div>
                    <div className="btn-3 border-1px-jungle-green"><div className="x-eth">0.05 ETH</div></div>
                    <div className="text-8">
                      <span className="span0">Only 300 Available<br /></span
                      ><span className="span librefranklin-normal-bon-jour-22px">(</span
                      ><span className="span2">Next one will cost 2ETH</span
                      ><span className="span librefranklin-normal-bon-jour-22px">)</span>
                    </div>
                  </div>
                  <img className="fasfa-info-circle-1" src={fasfainfocircle12x} />
                </div>
              </div>
              <img className="group-33966" src={group339661x} />
              <div className="overlap-group-4"><img className="fasfa-info-circle-2" src={vector2x} /></div>
            </div>
            <div className="lorem-ipsum spacemono-normal-emerald-32px">Lorem Ipsum</div>
          </div>
          <div className="overlap-group3">
            <img className="star-3" src={star32x} />
            <img className="star-2" src={star22x} />
            <div className="new">NEW</div>
          </div>
		</div>
	)
}

export default NftForSale;
