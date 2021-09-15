import React from "react";
import { Image, Button, Row, Col } from "antd";

import "./BannerTop.css";
import group339321x from "../../assets/group-33932@1x.svg";
import vector12x from "../../assets/vector-1@2x.svg";

const BannerTop = () => {
  return (
	<div className="frame-14435 bg-green-teal overflow-hidden min-w-full">
	<img className="group-33932" src={group339321x} />
	<div className="text-5 font-librefranklin text-2xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
	<div className="btn-2">
	  <img className="vector" src={vector12x} />
	  <div className="follow">Follow</div>
	</div>
  </div>
  );
};

export default BannerTop;
