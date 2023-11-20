import { getBlockInfo, EthereumBlock } from "./getBlockInfo";
import { determineAddressType } from "./getCode";
import { sigJudgemetTest } from "./getMatch_signiel";
import Txservice from "../../../Tx/Tx.service";
import { TxData } from "../../../Tx/Tx.model";
let hahah: any;
export async function analyzeData(data: any, bolocknum: any): Promise<boolean> {
  let transaction: TxData;
  hahah = await getBlockInfo(data.blockNumber);

  console.log("냐용");
  let tmp: boolean = false;
  let reusltFromType: string;
  let reusltToType: string;
  let sigEvaluateresult: string;
  try {
    for (let i: number = 0; i < hahah.transactions.length - 1; i++) {
      transaction = hahah.transactions[i];
      try {
        if (
          hahah.transactions[i].hash == null ||
          hahah.transactions[i].hash == undefined
        ) {
          continue;
        } else {
          sigEvaluateresult = await sigJudgemetTest(hahah.transactions[i].hash);
        }
        if (
          hahah.transactions[i].to == null ||
          hahah.transactions[i].to == undefined
        ) {
          continue;
        } else {
          reusltFromType = await determineAddressType(
            hahah.transactions[i].from
          );
          reusltToType = await determineAddressType(hahah.transactions[i].to);
        }
        await Txservice.CreateTxTest(
          transaction,
          reusltFromType,
          reusltToType,
          sigEvaluateresult,
          data?.timestamp,
          bolocknum
        );
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {}

  console.log("분석끝!");
  tmp = true;
  return tmp;
}
