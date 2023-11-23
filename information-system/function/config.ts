import Web3 from "web3";
import dotenv from "dotenv";
import "dotenv/config";

export const getRPC_URLtest = async () => {
  dotenv.config();

  const RPC_RRLtest = process.env.RPC_RRL || "RPC_RRLtest값이 읽히지않음";
  console.log(RPC_RRLtest);
  return RPC_RRLtest;
};
export const getProvider = async () => {
  const RPC_URL = await getRPC_URLtest();

  let web3: any;
  if (RPC_URL == "https://network.bouncecode.net/") {
    web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  } else {
    // web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));
    web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));
  }
  return web3;
};
