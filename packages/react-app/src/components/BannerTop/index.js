import React from "react";
import { Button } from "antd";

import Media from "react-media";

import "./BannerTop.css";
import group339321x from "../../assets/group-33932@1x.svg";
import vector12x from "../../assets/vector-1@2x.svg";

const BannerTop = () => {
  return (
	<Media
		queries={{
			small: "(max-width: 699px)",
			medium: "(min-width: 700px) and (max-width: 1199px)",
			large: "(min-width: 1200px)",
		}}
	>
		{matches => (
					<>
					{matches.large || matches.medium ? 
					(
					<div className="frame-14435 bg-green-teal overflow-hidden min-w-full">
						<img alt="" className="group-33932" src={group339321x} />
						<div className="text-5 font-librefranklin text-2xl">
						</div>
						<Button className="bannertop-twitterfollowbutton">
							<img alt="Twitter Logo" className="bannertop-vector" src={vector12x} />
							<div className="bannertop-follow">Follow</div>
						</Button>
					</div>
					)
					:
					(
						<div className="h-full bg-green-teal bg-opacity-75 px-8 pt-16 pb-24 overflow-hidden text-center">
							<div className="text-2xl font-librefranklin text-white p-6">
								Lorem Ipsum is simply dummy text.
							</div>
							<Button className="bannertop-twitterfollowbutton-mobile">
								<img alt="" className="vector" src={vector12x} />
								<div className="bannertop-follow">Follow</div>
							</Button>
						</div>
					)}
					</>
		)}
	</Media>
  );
};

export default BannerTop;
