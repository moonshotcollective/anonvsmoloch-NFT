import React from "react";
import { Button } from "antd";

import Media from "react-media";

import "./BannerBottom.css";
import star11x from "../../assets/star-1@1x.svg";
import star212x from "../../assets/star-2-1@2x.svg";
import bot211x from "../../assets/bot2-1@1x.png";

const BannerBottom = () => {
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
						<div className="bottom-bar overflow-hidden bg-green-dark-green min-w-full">
							<div className="overlap-group6">
								<img alt="" className="star-1" src={star11x} />
								<img alt="" className="star-2-1" src={star212x} />
								<img alt="" className="bot2-1" src={bot211x} />
								<div className="overlap-group-6 mr-12">
									<div className="text-green-teal text-3xl font-spacemono">
										Get the latest Edition
									</div>
									<div className="text-2xl font-librefranklin text-white">
										Lorem Ipsum is simply dummy text.
									</div>
								</div>
								<Button className="bannerbottom-joinnow mx-8 bg-green-teal join-now font-spacemono">
									<p>Join now</p>
								</Button>
							</div>
						</div>
					)
					:
					(
						<div class="h-full bg-green-dark-green bg-opacity-75 px-8 pt-16 pb-24 overflow-hidden text-center relative">
							<h2 class="tracking-widest text-xs title-font font-medium mb-1 text-green-teal text-3xl font-spacemono">
								Get the latest Edition
							</h2>
							<div className="text-2xl font-librefranklin text-white p-6">
								Lorem Ipsum is simply dummy text.
							</div>
							<Button className="bannerbottom-joinnow-mobile mx-8 bg-green-teal mobile-text-join-now font-spacemono">
								<p>Join now</p>
							</Button>
						</div>
					)}
					</>
		)}
	</Media>
  );
};

export default BannerBottom;
