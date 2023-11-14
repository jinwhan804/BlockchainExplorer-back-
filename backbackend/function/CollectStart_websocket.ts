import Web3 from "web3";
import { getBlockInfo, EthereumBlock } from "./analyzer/getBlockInfo";
import { determineAddressType } from "./analyzer/getCode";
import { sigJudgemetTest } from "./analyzer/getMatch_signiel";
import { Queue } from "./queue/getQueue";
import { analyzeData } from "./analyzer/analyzeData";
import BlockServices from "../../Blocks/Block.services";
// Sepolia 테스트넷의 WebSocket RPC URL 설정
const RPC_URL =
  "wss://sepolia.infura.io/ws/v3/d22607d7f58545f99e3c0eadcbf00eb4";

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
const web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));
let hahah: any;
export const subscribetest = async () => {
  let analyzeDatajudgement: boolean[] = new Array(5).fill(true);
  let tmpblock: BlockData;

  try {
    const subscription = await web3.eth.subscribe(
      "newBlockHeaders",
      (error: Error, blockHeader: BlockData) => {
        if (!error) {
          console.log("Block Header:", blockHeader);
        } else {
          console.error("Error:", error);
        }
      }
    );

    // "data" 이벤트 처리
    subscription.on("data", async (data: any) => {
      myQueue.enqueue(data);
      console.log(myQueue.size());
      for (let i = 0; i < analyzeDatajudgement.length; i++) {
        if (analyzeDatajudgement[i] == true) {
          try {
            analyzeDatajudgement[i] = false;
            analyzeDatajudgement[i] = await processDataQueue();
          } catch (error) {}
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
async function processDataQueue() {
  console.log("processDataQueue실행되었음!");
  const data = myQueue.dequeue();

  if (data !== undefined) {
    // blockData가 정의되었을 때 수행할 작업
    // 예: blockData를 사용하는 로직
    await BlockServices.createBlocktest(data);
  } else {
    // blockData가 정의되지 않았을 때 수행할 작업
  }

  // 데이터 분석을 비동기적으로 수행
  if (data) {
    return await analyzeData(data);
  } else {
    return false;
  }
}

// setInterval(() => {
//   processDataQueue();
// }, 2000);
