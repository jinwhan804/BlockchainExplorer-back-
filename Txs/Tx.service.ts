import TxDTO from "./Tx.dto";
import db from "../database";
import { TxData } from "./Tx.model";

import { getAddresstype } from "../backbackend/function/txns/getAddresstype";
import CAServices from "../CAs/CA.service";
import EOAServices from "../EOAs/EOA.service";

const createTx = async (data: TxDTO) => {
  try {
    const {
      accessList,
      chainId,
      from,
      gas,
      gasPrice,
      hash,
      input,
      maxFeePerGas,
      maxPriorityFeePerGas,
      r,
      s,
      to,
      transactionIndex,
      type,
      v,
      value,
      Method,
      Timestamp,
    } = data;

    await db.models.Tx.create({
      accessList,
      chainId,
      from,
      gas,
      gasPrice,
      hash,
      input,
      maxFeePerGas,
      maxPriorityFeePerGas,
      r,
      s,
      to,
      transactionIndex,
      type,
      v,
      value,
      Method,
      Timestamp,
    });
  } catch (error) {
    console.log("트랜잭션 서비스에서 트랜잭션 데이터 추가하다 에러남");
    console.log(error);
  }
};

const CreateTxTest = async (
  data: TxData,
  getcoderesultFrom: string,
  getcoderesultTO: string,
  sigEvaluateresult: string,
  timestamp?: bigint
): Promise<void> => {
  try {
    const {
      accessList,
      chainId,
      from,
      gas,
      gasPrice,
      hash,
      input,
      maxFeePerGas,
      maxPriorityFeePerGas,
      r,
      s,
      to,
      transactionIndex,
      type,
      v,
      value,
      Method,
      Timestamp,
    } = data;

    await getAddresstype(from, getcoderesultFrom, sigEvaluateresult);
    await getAddresstype(to, getcoderesultTO, sigEvaluateresult);
    console.log(sigEvaluateresult);
    const parts = sigEvaluateresult.split(",");
    if (parts[2]) {
      await db.models.Tx.create({
        accessList,
        chainId,
        from,
        gas,
        gasPrice,
        hash,
        input,
        maxFeePerGas,
        maxPriorityFeePerGas,
        r,
        s,
        to,
        transactionIndex,
        type,
        v,
        value,
        Method: parts[2],
        Timestamp: timestamp,
      });
    } else {
      await db.models.Tx.create({
        accessList,
        chainId,
        from,
        gas,
        gasPrice,
        hash,
        input,
        maxFeePerGas,
        maxPriorityFeePerGas,
        r,
        s,
        to,
        transactionIndex,
        type,
        v,
        value,
        Method: sigEvaluateresult,
        Timestamp: timestamp,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default { createTx, CreateTxTest };
