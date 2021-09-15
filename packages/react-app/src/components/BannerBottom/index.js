import React from "react";
import { Image, Button, Row, Col } from "antd";

import "./BannerBottom.css";
import star11x from "../../assets/star-1@1x.svg";
import star212x from "../../assets/star-2-1@2x.svg";
import bot211x from "../../assets/bot2-1@1x.png";

const BannerBottom = () => {
  return (
	<div className="frame-14437 overflow-hidden bg-green-dark-green min-w-full">
		<div className="overlap-group6">
			<img className="star-1" src={star11x} />
			<img className="star-2-1" src={star212x} />
			<img className="bot2-1" src={bot211x} />
			<div className="overlap-group-6 mr-12">
				<div className="text-green-teal text-3xl font-spacemono">
				Get the latest Edition
				</div>
				<div className="text-2xl font-librefranklin text-5">
					Lorem Ipsum is simply dummy text.
				</div>
			</div>
			<Button className="btn-4 mx-8 bg-green-teal">
				<div className="join-now font-spacemono">Join now</div>
			</Button>
		</div>
	</div>
  );
};

export default BannerBottom;
