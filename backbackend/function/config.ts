import Web3 from "web3";
import "dotenv/config";

export const getRPC_URLtest = async () => {
  // dotenv.config();

  const RPC_RRLtest = process.env.RPC_RRL || "테스트";
  return RPC_RRLtest;
};
export const getProvider = async () => {
  const RPC_URL = await getRPC_URLtest();
  let web3;
  if (RPC_URL == "https://network.bouncecode.net/") {
    web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  } else {
    web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));
  }
  return web3;
};
