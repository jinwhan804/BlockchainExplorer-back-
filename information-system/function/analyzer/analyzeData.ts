import { getBlockInfo, EthereumBlock } from "./getBlockInfo";
import { determineAddressType } from "./getCode";
import { sigJudgemetTest } from "./getMatch_signiel";
import Txservice from "../../../Tx/Tx.service";
import { TxData } from "../../../Tx/Tx.model";
import BlockService from "../../../Block/Block.service";
let block_with_transaction: any;
export async function analyzeData(data: any): Promise<boolean> {
  let transaction: TxData;
  // let tmpnum: number = 4734754;
  block_with_transaction = await getBlockInfo(data.blockNumber);
  console.log("analyzeData", block_with_transaction.transactions.length);
  const relationshipinfo = await BlockService.createBlocktest(
    data,
    block_with_transaction.transactions.length
  );

  console.log("냐용");
  let tmp: boolean = false;
  let reusltFromType: string;
  let reusltToType: string;
  let sigEvaluateresult: string;
  try {
    for (
      let i: number = 0;
      i < block_with_transaction.transactions.length - 1;
      i++
    ) {
      transaction = block_with_transaction.transactions[i];
      try {
        if (
          block_with_transaction.transactions[i].hash == null ||
          block_with_transaction.transactions[i].hash == undefined
        ) {
          continue;
        } else {
          sigEvaluateresult = await sigJudgemetTest(
            block_with_transaction.transactions[i].hash
          );
        }
        if (
          block_with_transaction.transactions[i].to == null ||
          block_with_transaction.transactions[i].to == undefined
        ) {
          continue;
        } else {
          reusltFromType = await determineAddressType(
            block_with_transaction.transactions[i].from
          );
          reusltToType = await determineAddressType(
            block_with_transaction.transactions[i].to
          );
        }
        await Txservice.CreateTxTest(
          transaction,
          reusltFromType,
          reusltToType,
          sigEvaluateresult,
          data?.timestamp,
          relationshipinfo.dataValues.id,
          block_with_transaction.number
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
