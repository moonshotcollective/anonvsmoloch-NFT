import React from "react";
import { Button, Image } from "antd";

import "./NftCard.css";

import redDot from "../../assets/dot-red.svg";
import greenDot from "../../assets/dot-green.svg";

const NftCard = ({ img, imgBackground, width, height, title, soldout, price, token, extraText }) => {
  return (
	<div className="h-full border-opacity-60 rounded-lg overflow-hidden">
		<div className="p-8 items-center justify-self-center">
			<Image preview={false} src={img} width={width} height={height} />
		</div>
		<h2 className="tracking-widest text-md title-font font-medium text-gray-400 mb-1 nft-title p-2">{title}</h2>
		<div className="mb-3 nft-title">
			{
				soldout?
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
				<div>
					<Button className="flex mx-auto mt-6 py-4 my-2 px-5 text-spacemono salebutton hover:bg-green-teal hover:border-black hover:text-black">
						{`${price} ${token}`}
					</Button>
					<p className="nft-description-available">
						{extraText} <Image preview={false} src={greenDot}/>
					</p>
					<p className="nft-description">
						(check the latest)
					</p>
				</div>
			}
		</div>
	</div>
  );
};

export default NftCard;