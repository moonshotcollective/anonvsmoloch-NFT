import WalletConnectProvider from "@walletconnect/web3-provider";
import { Alert, Button, Col, Menu, Row, Image, PageHeader, Drawer } from "antd";
import "antd/dist/antd.css";
import React, { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import "./App.css";
import Media from "react-media";
import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
import { Transactor } from "./helpers";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner,
} from "./hooks";

// These assets will be used. Code using this is commented out
import introbackground from "./assets/introbackground.svg";
import anonvsmolochlogo from "./assets/anonvsmolochlogo.svg";
import ethbotbegins from "./assets/ethbotbegins.svg";
import rectangle9221x from "./assets/rectangle-922@1x.svg";
import introBackground from "./assets/intro-background.png";
import group339272x from "./assets/group-33927@2x.svg";
import group339702x from "./assets/group-33970@2x.svg";
import vector12x from "./assets/vector-1@2x.svg";
import group339281x from "./assets/group-33928@1x.svg";
import ellipse142x from "./assets/ellipse-14@2x.svg";
import layer2er12x from "./assets/layer-2er-1@2x.png";
import fasfainfocircle2x from "./assets/-fas-fa-info-circle@2x.svg";
import group339482x from "./assets/group-33948@2x.svg";
import vector2x from "./assets/vector@2x.svg";
import group339321x from "./assets/group-33932@1x.svg";
import group3395712x from "./assets/group-33957-1@2x.svg";
import bg1x from "./assets/bg@1x.svg";
import fasfainfocircle12x from "./assets/-fas-fa-info-circle-1@2x.svg";
import group339661x from "./assets/group-33966@1x.svg";
import star32x from "./assets/star-3@2x.svg";
import star22x from "./assets/star-2@2x.svg";
import maskgroup2x from "./assets/mask-group@2x.svg";
import maskgroup12x from "./assets/mask-group-1@2x.svg";
import maskgroup22x from "./assets/mask-group-2@2x.svg";
import star11x from "./assets/star-1@1x.svg";
import star212x from "./assets/star-2-1@2x.svg";
import bot211x from "./assets/bot2-1@1x.png";
import layer212x from "./assets/layer-2-1@2x.png";
import group3392712x from "./assets/group-33927-1@2x.svg";
import frame144361x from "./assets/frame-14436@1x.svg";
import burgerMenuIcon from "./assets/burgerMenuIcon.svg";

const { SubMenu } = Menu;

const { BufferList } = require("bl");
// https://www.npmjs.com/package/ipfs-http-client
const ipfsAPI = require("ipfs-http-client");

const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });

const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.localhost; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;

// EXAMPLE STARTING JSON:
const STARTING_JSON = {
  description: "It's actually a bison?",
  external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
  image: "https://austingriffith.com/images/paintings/buffalo.jpg",
  name: "Buffalo",
  attributes: [
    {
      trait_type: "BackgroundColor",
      value: "green",
    },
    {
      trait_type: "Eyes",
      value: "googly",
    },
  ],
};

// helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    console.log(content);
    return content;
  }
};

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544")
  : null;
const mainnetInfura = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
  : null;
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

/*
	Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

function App(props) {
  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userSigner = useUserSigner(injectedProvider, localProvider);

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, { chainId: localChainId });

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider);

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  });

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(mainnetContracts, "DAI", "balanceOf", [
    "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  ]);

  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader(readContracts, "YourCollectible", "balanceOf", [address]);
  console.log("🤗 balance:", balance);

  // 📟 Listen for broadcast events
  const transferEvents = useEventListener(readContracts, "YourCollectible", "Transfer", localProvider, 1);
  console.log("📟 Transfer events:", transferEvents);

  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const yourBalance = balance && balance.toNumber && balance.toNumber();
  const [yourCollectibles, setYourCollectibles] = useState();

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("GEtting token index", tokenIndex);
          const tokenId = await readContracts.YourCollectible.tokenOfOwnerByIndex(address, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts.YourCollectible.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          console.log("ipfsHash", ipfsHash);

          const jsonManifestBuffer = await getFromIPFS(ipfsHash);

          try {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            console.log("jsonManifest", jsonManifest);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [address, yourBalance]);

  /*
	const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
	console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
	*/

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts &&
      mainnetContracts
    ) {
      console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      console.log("📝 readContracts", readContracts);
      console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    mainnetContracts,
  ]);

  let networkDisplay = "";
  if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network ID"
            description={
              <div>
                You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
                HardHat.
                <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    } else {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network"
            description={
              <div>
                You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
                <Button
                  onClick={async () => {
                    const ethereum = window.ethereum;
                    const data = [
                      {
                        chainId: "0x" + targetNetwork.chainId.toString(16),
                        chainName: targetNetwork.name,
                        nativeCurrency: targetNetwork.nativeCurrency,
                        rpcUrls: [targetNetwork.rpcUrl],
                        blockExplorerUrls: [targetNetwork.blockExplorer],
                      },
                    ];
                    console.log("data", data);
                    const tx = await ethereum.request({ method: "wallet_addEthereumChain", params: data }).catch();
                    if (tx) {
                      console.log(tx);
                    }
                  }}
                >
                  <b>{networkLocal && networkLocal.name}</b>
                </Button>
                .
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    }
  } else {
    networkDisplay = (
      <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
        {targetNetwork.name}
      </div>
    );
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  let faucetHint = "";
  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

  const [faucetClicked, setFaucetClicked] = useState(false);
  if (
    !faucetClicked &&
    localProvider &&
    localProvider._network &&
    localProvider._network.chainId == 31337 &&
    yourLocalBalance &&
    ethers.utils.formatEther(yourLocalBalance) <= 0
  ) {
    faucetHint = (
      <div style={{ padding: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            faucetTx({
              to: address,
              value: ethers.utils.parseEther("0.01"),
            });
            setFaucetClicked(true);
          }}
        >
          💰 Grab funds from the faucet ⛽️
        </Button>
      </div>
    );
  }

  const [yourJSON, setYourJSON] = useState(STARTING_JSON);
  const [sending, setSending] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [ipfsDownHash, setIpfsDownHash] = useState();

  const [downloading, setDownloading] = useState();
  const [ipfsContent, setIpfsContent] = useState();

  const [transferToAddresses, setTransferToAddresses] = useState({});

  const [navVisible, setNavVisible] = useState(false);

  const onClose = () => {
    setNavVisible(false);
  };
  const showDrawer = () => {
    setNavVisible(true);
  };

  return (
    <body style={{ margin: 0, background: "#000000" }}>
      <input type="hidden" id="anPageName" name="page" value="v2" />
      <div className="container-center-horizontal">
        <div className="v2 screen">
          <div className="overlap-group8">
            <div className="overlap-group-1">
              <img alt="background image cover nav" className="v2 introBackgroundCover" src={rectangle9221x} />
              <img alt="background image nav" className="v2 introBackground" src={introBackground} />
              <div className="rectangle-923" />
            </div>
            <PageHeader
              extra={[
                <div key="navbar">
                  <Media
                    queries={{
                      small: "(max-width: 699px)",
                      medium: "(min-width: 700px) and (max-width: 1199px)",
                      large: "(min-width: 1200px)",
                    }}
                  >
                    {matches => (
                      <>
                        {matches.large || matches.medium ? (
                          <div>
                            <Image className="largeHeadLargeMedium" src={group339272x} />
                            <Row className="menu-items spacemono-normal-green-sheen-16px" gutter={16}>
                              <Col className="gutter-row" span={6}>
                                <Image className="group-33970" src={group339702x} />
                              </Col>
                              <Col className="gutter-row" span={6}>
                                <div className="top-navbar">Explore Editions</div>
                              </Col>
                              <Col className="gutter-row" span={6}>
                                <div className="top-navbar">How It Works</div>
                              </Col>
                              <Col className="gutter-row" span={6}>
                                <div className="top-navbar">About</div>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          <div>
                            <Image className="largeHeadSmall" src={group339272x} />
                            <a onClick={showDrawer}>
                              <Image className="menuIconSmall" src={burgerMenuIcon} />
                            </a>
                            <Drawer
                              placement="bottom"
                              closable
                              onClose={onClose}
                              visible={navVisible}
                              width="100vh"
                              height="100vh"
                            >
                              <div className="v2">
                                <div className="overlap-group8-nav">
                                  <div className="overlap-group-1-nav">
                                    <img
                                      className="v2 introBackgroundCover-nav"
                                      src={rectangle9221x}
                                      alt="rectangle background"
                                    />
                                    <img
                                      className="v2 introBackground-nav"
                                      src={introBackground}
                                      alt="intro background"
                                    />
                                    <div className="rectangle-923-nav" />
                                  </div>
                                  <div>
                                    <Image className="largeHeadSmall infront" src={group339272x} />
                                    <a onClick={onClose}>
                                      <Image className="menuIconSmall infront" src={burgerMenuIcon} />
                                    </a>
                                    <div className="nav-view-slider">
                                      <Row gutter={16}>
                                        <Col span={8} offset={4}>
                                          <Image
                                            className="infront-bottom nav-gitcoin-margin"
                                            src={group339702x}
                                            width={150}
                                            height={100}
                                          />
                                        </Col>
                                      </Row>
                                      <Row gutter={16}>
                                        <Col span={8} offset={4}>
                                          <h1 className="top-navbar-text-style infront-bottom nav-text-margin">
                                            Explore Editions
                                          </h1>
                                        </Col>
                                      </Row>
                                      <Row gutter={16}>
                                        <Col span={8} offset={4}>
                                          <h1 className="top-navbar-text-style infront-bottom nav-text-margin">
                                            How It Works
                                          </h1>
                                        </Col>
                                      </Row>
                                      <Row gutter={16}>
                                        <Col span={8} offset={4}>
                                          <h1 className="top-navbar-text-style infront-bottom nav-text-margin">
                                            About
                                          </h1>
                                        </Col>
                                      </Row>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Drawer>
                          </div>
                        )}
                      </>
                    )}
                  </Media>
                </div>,
              ]}
            />
            {/* <Image className="group-33927" src={group339272x} />
            <div className="menu-items spacemono-normal-green-sheen-16px">
              <Image className="group-33970" src={group339702x} />
              <div className="top-navbar">Explore Editions</div>
              <div className="top-navbar">How It Works</div>
              <div className="top-navbar">About</div>
            </div> */}

            {/* <Navbar /> */}

            <div className="text-1-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text
              .
            </div>
            <div className="x16d-10h-16m spacemono-normal-green-sheen-32px">16d 10h 16m</div>
            <Button className="twitter-follow-btn">
              <img className="vector" src={vector12x} />
              <div className="follow">Follow</div>
            </Button>
            <div className="rectangle-1288" />
            <div className="group-33929">
              <h1 className="text-4">The Greatest Larp has Begun</h1>

              {/* Statue Text */}
              {/* <div className="group-33937">
              <div className="text-3 spacemono-normal-green-sheen-32px">Gitcoin Comics -Edition #2</div>
              <div className="text-2-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting .Lorem Ipsum is simply dummy text.
              </div>
            </div> */}
            </div>

            <img className="group-33928" src={group339281x} />

            {/* Statues */}
            {/* 
          <div className="group-33952">
            <div className="group-33949">
              <div className="group-33964">
                <div className="group-33959">
                  <div className="overlap-group-2">
                    <img className="ellipse-14" src={ellipse142x} />
                    <img className="layer-2er-1" src={layer2er12x} />
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
            <img className="group-33948-1" src={group339482x} />
          </div>
          <img className="vector-1" src={vector2x} /> */}
          </div>

          {/* First banner */}

          {/* <div className="frame-14435">
          <img className="group-33932" src={group339321x} />
          <div className="text-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
          <div className="btn-2 border-1px-jungle-green">
            <img className="vector" src={vector12x} />
            <div className="follow">Follow</div>
          </div>
        </div> */}

          {/* Overlapping Div includes NFTs for sale, mentions bar and bottom banner */}

          <div className="overlap-group9">
            {/* NFT for sale bar */}

            {/* <div className="overlap-group2">
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
          </div> */}

            {/* Mentions Bar */}

            {/* <div className="group-33969">
            <div className="overlap-group5">
              <div className="overlap-group4">
                <div className="group-33931">
                  <div className="text-9 spacemono-normal-green-sheen-32px">What people Are Saying About Us</div>
                  <div className="flex-row-1">
                    <div className="background-1 border-4px-green-sheen-2"></div>
                    <div className="overlap-group1-1 border-4px-green-sheen-2">
                      <div className="flex-row-2">
                        <img className="mask-group" src={maskgroup2x} />
                        <div className="flex-col">
                          <div className="name">Kevin Owocki</div>
                          <div className="owocki miriamlibre-normal-ice-cold-18px">@owocki</div>
                        </div>
                      </div>
                      <div className="overlap-group-5">
                        <p className="text-1 librefranklin-normal-bon-jour-16px">
                          Lorem Ipsum has been survived not only five centuries, but also the leap into electronic
                          typesetting, remaining essentially unchanged.
                        </p>
                        <div className="text-1-1 librefranklin-semi-bold-bon-jour-32px">“</div>
                      </div>
                    </div>
                    <div className="background-2 border-4px-green-sheen-2"></div>
                  </div>
                </div>
                <div className="group-33933">
                  <div className="flex-row">
                    <img className="mask-group" src={maskgroup12x} />
                    <div className="flex-col">
                      <div className="name">Kevin Owocki</div>
                      <div className="owocki miriamlibre-normal-ice-cold-18px">@owocki</div>
                    </div>
                  </div>
                  <div className="overlap-group">
                    <p className="text-1 librefranklin-normal-bon-jour-16px">
                      Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <div className="text-1-1 librefranklin-semi-bold-bon-jour-32px">“</div>
                  </div>
                </div>
                <div className="group-33935">
                  <div className="flex-row">
                    <img className="mask-group" src={maskgroup22x} />
                    <div className="flex-col">
                      <div className="name-1">Kevin Owocki</div>
                      <div className="owocki miriamlibre-normal-ice-cold-18px">@owocki</div>
                    </div>
                  </div>
                  <div className="overlap-group">
                    <p className="text-1 librefranklin-normal-bon-jour-16px">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <div className="text-1-1 librefranklin-semi-bold-bon-jour-32px">“</div>
                  </div>
                </div>
              </div>
              <div className="text-16 spacemono-normal-green-sheen-42px">
                &lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
              </div>
            </div>
          </div> */}

            {/* Bottom Banner */}

            {/* <div className="frame-14437">
            <div className="overlap-group6">
              <div className="rectangle-1324"></div>
              <img className="star-1" src={star11x} />
              <img className="star-2-1" src={star212x} />
              <img className="bot2-1" src={bot211x} />
              <div className="overlap-group-6">
                <div className="text-17 spacemono-normal-emerald-32px">Get the latest Edition</div>
                <div className="text-18 librefranklin-normal-bon-jour-20px">
                  Lorem Ipsum is simply dummy text of the printing .
                </div>
              </div>
              <div className="btn-4"><div className="join-now">Join now</div></div>
            </div>
          </div> */}

            {/* large bottom figure above banner */}
            {/* <img className="layer-2-1" src={layer212x} /> */}
          </div>

          {/* FAQ Component */}

          {/* <div className="faq">
          <div className="overlap-group7">
            <div className="faqs spacemono-normal-emerald-32px">FAQ’S !?</div>
            <div className="group-33939">
              <div className="overlap-group-7">
                <div className="background border-1px-jungle-green"></div>
                <div className="address spacemono-normal-green-sheen-24px">#1 What is Lorem Ipsum?</div>
                <div className="text-2 spacemono-normal-green-sheen-42px">&gt;</div>
              </div>
              <div className="overlap-group1-2">
                <div className="background border-1px-jungle-green"></div>
                <div className="background-3 border-1px-jungle-green"></div>
                <div className="address-1">#2 What is Lorem Ipsum?</div>
                <p className="text-21 librefranklin-normal-bon-jour-16px">
                  Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been
                  survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                  unchanged.
                </p>
                <div className="text-22">&gt;</div>
              </div>
              <div className="overlap-group2-1">
                <div className="background border-1px-jungle-green"></div>
                <div className="background border-1px-jungle-green"></div>
                <div className="address-2 spacemono-normal-green-sheen-24px">#2 What is Lorem Ipsum?</div>
                <div className="text-2 spacemono-normal-green-sheen-42px">&gt;</div>
              </div>
              <div className="overlap-group3-1">
                <div className="background border-1px-jungle-green"></div>
                <div className="background border-1px-jungle-green"></div>
                <div className="address spacemono-normal-green-sheen-24px">#2 What is Lorem Ipsum?</div>
                <div className="text-2 spacemono-normal-green-sheen-42px">&gt;</div>
              </div>
            </div>
          </div>
        </div> */}

          {/* FOOTER */}
          {/* <div className="group-33962">
          <img className="group-33927-1" src={group3392712x} />
          <div className="frame-14437-1">
            <img className="frame-14436" src={frame144361x} />
            <div className="text-19">
              <span className="librefranklin-normal-bon-jour-20px">Powered by </span
              ><span className="span-2 librefranklin-semi-bold-emerald-20px">Gitcoin</span
              ><span className="librefranklin-normal-ice-cold-20px"> | Direct by</span
              ><span className="librefranklin-normal-bon-jour-20px">&nbsp;</span
              ><span className="span-2 librefranklin-semi-bold-emerald-20px">Devils Due</span
              ><span className="librefranklin-normal-ice-cold-20px"> | Illustrated by</span
              ><span className="librefranklin-normal-bon-jour-20px">&nbsp;</span
              ><span className="span-2 librefranklin-semi-bold-emerald-20px">Josh Blaylock</span
              ><span className="span8">&nbsp;</span><span className="librefranklin-normal-ice-cold-20px"> | Produced by</span
              ><span className="librefranklin-normal-bon-jour-20px">&nbsp;</span
              ><span className="librefranklin-semi-bold-emerald-20px">Devils Due </span><span className="span12"></span>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </body>
  );
}

export default App;
