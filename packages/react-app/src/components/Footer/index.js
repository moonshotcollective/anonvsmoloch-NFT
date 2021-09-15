import React from "react";
import { Image } from "antd";

import "./Footer.css";
import group3392712x from "../../assets/group-33927-1@2x.svg";
import youtube from "../../assets/icon-youtube.svg";
import twitter from "../../assets/icon-twitter.svg";
import mail from "../../assets/icon-mail.svg";
import discord from "../../assets/icon-discord.svg";

const Footer = () => {
  return (
	<div className="group-33962 min-w-full">
	<Image key="Footer Bot Head" className="footerBotHead align-center" src={group3392712x} />
	<div className="frame-14437-1">
		<div className="flex flex-row align-center">
			<a key="youtube" href="">
				<Image key="youtube" className="footer-icon" src={youtube} />
			</a>
			<a key="twitter" href="">
				<Image key="twitter" className="footer-icon" src={twitter} />
			</a>
			<a key="mail" href="mail">
				<Image key="mail" className="footer-icon" src={mail} />
			</a>
			<a key="discord" href="discord">
				<Image key="discord" className="footer-icon" src={discord} />
			</a>
		</div>
	  <div className="flex flex-row align-center container">
		<span className="footer-font-v1">Powered by </span>
		<span className="footer-font-v2">Gitcoin</span>
		<span className="footer-font-v3"> | Direct by</span>
		<span className="footer-font-v3">&nbsp;</span>
		<span className="footer-font-v2">Devils Due</span>
		<span className="footer-font-v3"> | Illustrated by</span>
		<span className="footer-font-v2">&nbsp;</span>
		<span className="footer-font-v2">Josh Blaylock</span>
		<span className="footer-font-v3">&nbsp;</span><span className="footer-font-v3"> | Produced by</span>
		<span className="footer-font-v2">&nbsp;</span>
		<span className="footer-font-v2">Devils Due</span>
	  </div>
	</div>
  </div>
  );
};

export default Footer;
