import { BlockData } from "../CollectStart_websocket";
import { analyzeData } from "../analyzer/analyzeData";
import { Queue } from "../queue/getQueue";
import { getProvider } from "../config";

const CHAIN_ID = 18328;
const myQueue = new Queue<BlockData>();

export const getallblock = async () => {
  const web3 = await getProvider();

  const latestBlock: BlockData = await web3.eth.getBlock("latest", true);
  console.log(latestBlock);
  let latestBlockNumber: bigint | undefined;
  if (latestBlock.number !== undefined) {
    latestBlockNumber = latestBlock.number;
    for (let i = 3404784; i <= Number(latestBlockNumber) - 1; i++) {
      // console.log(i);
      const block = await web3.eth.getBlock(i);
      await analyzeData(block);
      if (block.transactions) {
        // console.log(block.transactions);
      }
    }
  }
};
