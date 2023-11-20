import Web3 from "web3";
import { BlockData } from "../CollectStart_websocket";
import { getProvider } from "../config";

const CHAIN_ID = 18328;

const getallblack = async () => {
  const web3 = await getProvider();

  const latestBlock: BlockData = await web3.eth.getBlock("latest", true);
  console.log(latestBlock);
  let latestBlockNumber: bigint | undefined;
  if (latestBlock.number !== undefined) {
    latestBlockNumber = latestBlock.number;
    for (let i = 450000; i <= latestBlockNumber; i++) {
      // console.log(i);
      const block = await web3.eth.getBlock(i, true);
      if (block.transactions) {
        console.log("야스", block);
        console.log(block.transactions);
      }
    }
  }

  // const block = await web3.eth.getBlock(1231233, true);
  // console.log(`Block ${2}:`, block);
  // web3.eth.getTransaction("asd", (error, transaction) => {
  //   console.log(transaction);
  // });
};

getallblack();
