import React from "react";
import { Button, Image } from "antd";

import "./NftCard.css";

import redDot from "../../assets/dot-red.svg";
import greenDot from "../../assets/dot-green.svg";

const NftCard = ({ img, width, height, title, soldout, price, token, extraText }) => {
  return (
	<div className="h-full border-opacity-60 rounded-lg overflow-hidden">
		<Image class="flex mx-auto mt-6 py-6 my-2 px-10" preview={false} src={img} />
		<h2 className="tracking-widest text-md title-font font-medium text-gray-400 mb-1 nft-title p-2 mt-8">{title}</h2>
		<div className="mb-3 nft-title">
			{
				soldout === 0 ?
				<div>
					<Button className="flex mx-auto mt-6 py-4 my-2 px-5 text-spacemono comingsoon hover:bg-gray-050 hover:border-black hover:text-black">
						COMING SOON
					</Button>
				</div>
				:
				""
			}
			{
				soldout === 1 ?
				<div>
					<Button className="flex mx-auto mt-6 py-4 my-2 px-5 text-spacemono soldoutbutton hover:bg-red-soldout hover:border-black hover:text-black">Sold Out</Button>
					<p className="nft-description">
						Not Available <Image preview={false} src={redDot}/>
					</p>
					<p className="nft-description">
						(check the latest)
					</p>
				</div>
				:
				""
			}
			{
				soldout === 2 ? 
				<div>
					<Button className="flex mx-auto mt-6 py-4 my-2 px-5 text-spacemono soldoutbutton hover:bg-red-soldout hover:border-black hover:text-black">Sold Out</Button>
					<p className="nft-description">
						Not Available <Image preview={false} src={redDot}/>
					</p>
					<p className="nft-description">
						(check the latest)
					</p>
				</div>
				:
				""
			}
		</div>
	</div>
  );
};

export default NftCard;