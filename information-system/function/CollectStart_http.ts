import Web3 from "web3";
import { getBlockInfo, EthereumBlock } from "./analyzer/getBlockInfo";
import { determineAddressType } from "./analyzer/getCode";
import { sigJudgemetTest } from "./analyzer/getMatch_signiel";
import { Queue } from "./queue/getQueue";
import { analyzeData } from "./analyzer/analyzeData";
import BlockServices from "../../Block/Block.service";
import BlockDTO from "../../Block/Block.dto";
import { getRPC_URLtest } from "./config";
import { getProvider } from "./config";
// Sepolia 테스트넷의 WebSocket RPC URL 설정
const RPC_URL = "https://network.bouncecode.net/";
const CHAIN_ID = 18328;

// Web3 인스턴스 생성

export interface BlockData {
  number?: bigint;
  hash?: string; // 선택적으로 만들거나 'string'으로 지정
  parentHash?: string;
  sha3Uncles?: string;
  logsBloom?: string;
  transactionsRoot?: string;
  stateRoot?: string;
  receiptsRoot?: string;
  miner?: string;
  difficulty?: bigint;
  extraData?: string;
  gasLimit?: bigint;
  gasUsed?: bigint;
  timestamp?: bigint;
  baseFeePerGas?: bigint;
  withdrawalsRoot?: string; // 'withdrawalsRoot'를 선택적으로 변경
  nonce?: bigint;
  mixHash?: string;
}
const myQueue = new Queue<BlockData>();

let hahah: any;
export const CollectStart_http = async () => {
  const web3 = await getProvider();
  let analyzeDatajudgement: boolean[] = new Array(5).fill(true);
  let latestBlock: BlockData;
  let tmpblock: BlockData;
  try {
    latestBlock = await web3.eth.getBlock("latest", true);
    setInterval(async () => {
      tmpblock = await web3.eth.getBlock("latest", true);

      // console.log(latestBlock);
      if (latestBlock.number !== tmpblock.number) {
        console.log("응애");
        latestBlock = tmpblock;
        myQueue.enqueue(latestBlock);
        console.log(myQueue.size());
        for (let i = 0; i < analyzeDatajudgement.length; i++) {
          if (analyzeDatajudgement[i] == true) {
            analyzeDatajudgement[i] = false;
            analyzeDatajudgement[i] = await processDataQueue();
          }
        }
      }
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
  }
};
async function processDataQueue() {
  console.log("processDataQueue실행되었음!");
  const data = myQueue.dequeue();

  if (data !== undefined && data !== null) {
    // blockData가 정의되었을 때 수행할 작업
    // 예: blockData를 사용하는 로직
    // const relationshipinfo = await BlockServices.createBlocktest(data);
    // console.log("relationship", relationshipinfo);
    return await analyzeData(data);
  } else {
    // blockData가 정의되지 않았을 때 수행할 작업
    console.log("블록데이터가없다. 다시 대가상태로만들어주기");
    return true;
  }

  // 데이터 분석을 비동기적으로 수행
  // if (data) {
  // } else {
  // }
}
// async function processDataQueue() {
//   console.log("processDataQueue실행되었음!");
//   const data = myQueue.dequeue();
//   // console.log(myQueue);
//   if (data !== undefined) {
//     // blockData가 정의되었을 때 수행할 작업
//     // 예: blockData를 사용하는 로직
//     await BlockServices.createBlocktest(data);
//   } else {
//     // blockData가 정의되지 않았을 때 수행할 작업
//   }

//   // 데이터 분석을 비동기적으로 수행
//   if (data) {
//     return await analyzeData(data);
//   } else {
//     return false;
//   }
// }

// setInterval(() => {
//   processDataQueue();
// }, 2000);
