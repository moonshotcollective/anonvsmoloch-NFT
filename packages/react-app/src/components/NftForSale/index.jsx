import React from 'react'

import "./NftForSale.css";

import NftCard from "../NftCard";

import nft3Background from "../../assets/nft3-background.png";
import nft3 from "../../assets/nft3.png";
import nft2 from "../../assets/nft2.png";

const NftForSale = () => {
	return (
    <section className="min-w-full">
        <div className="m-w-full nftforsale-background">
            <div className="text-green-teal text-3xl font-spacemono text-center p-6">
              Get the latest Edition
            </div>
            <div className="flex flex-wrap -m-4 justify-center isolate">
              <div className="p-4 lg:w-1/3">
                <NftCard
                  img={nft3}
                  imgBackground={nft3Background}
                  width={300}
                  height={350}
                  title={'Moloch'}
                  soldout={true}
                  price={0}
                  extraText={'(check the lasts)'}
                />
              </div>
              <div className="p-4 lg:w-1/3">
                <NftCard
                    img={nft2}
                    imgBackground={nft3Background}
                    width={300}
                    height={350}
                    title={'Ed.2 Digital Comic'}
                    soldout={true}
                    price={0}
                    extraText={'(check the lasts)'}
                  />
              </div>
              <div className="p-4 lg:w-1/3">
                <NftCard
                    img={nft3}
                    imgBackground={nft3Background}
                    width={300}
                    height={350}
                    title={'Moloch'}
                    soldout={true}
                    price={0}
                    extraText={'(check the lasts)'}
                  />
              </div>
            </div>
        </div>

        <div className="w-full py-4">
          <p className="bottom-tag-line w-full justify-center text-center">(75% proceeds go to Gitcoin Grants, 25=&gt; Artist)</p>
        </div>
      </section>
	)
}

export default NftForSale;
