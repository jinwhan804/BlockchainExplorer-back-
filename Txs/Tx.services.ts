import TxDTO from "./Tx.dtos";
import db from "../database";
import { TxData } from "./Tx.model";

import { getAddresstype } from "../backbackend/function/txns/getAddresstype";
import TxCAService from "../TxCA/TxCA.service";
import TxEOAService from "../TxEOA/TxEOA.service";
import CAServices from "../CAs/CA.services";
import EOAServices from "../EOAs/EOA.services";
import { get } from "http";

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
  timestamp?: bigint,
  bolocknum?: number
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

    const Fromcol_id = await getAddresstype(
      from,
      getcoderesultFrom,
      sigEvaluateresult
    );

    const TOcol_id = await getAddresstype(
      to,
      getcoderesultTO,
      sigEvaluateresult
    );

    console.log(sigEvaluateresult);
    const parts = sigEvaluateresult.split(",");
    const result: any = await db.models.Tx.create({
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
      Method: parts[2] || sigEvaluateresult, // parts[2]가 존재하면 parts[2]를 사용, 그렇지 않으면 sigEvaluateresult 사용
      Timestamp: timestamp,
      block_id: bolocknum,
    });

    if (getcoderesultFrom == getcoderesultTO) {
      if (getcoderesultFrom == "contract") {
        await TxCAService.createTxCA(
          result.dataValues.id,
          Fromcol_id.dataValues.id
        );
        await TxCAService.createTxCA(
          result.dataValues.id,
          TOcol_id.dataValues.id
        );
      } else if (getcoderesultFrom == "EOA") {
        await TxEOAService.createTxEOA(
          result.dataValues.id,
          Fromcol_id.dataValues.id
        );
        await TxEOAService.createTxEOA(
          result.dataValues.id,
          TOcol_id.dataValues.id
        );
      }
    } else {
      if (getcoderesultFrom == "EOA") {
        await TxEOAService.createTxEOA(
          result.dataValues.id,
          Fromcol_id.dataValues.id
        );
        await TxCAService.createTxCA(
          result.dataValues.id,
          TOcol_id.dataValues.id
        );
      } else if (getcoderesultFrom == "contract") {
        await TxEOAService.createTxEOA(
          result.dataValues.id,
          TOcol_id.dataValues.id
        );
        await TxCAService.createTxCA(
          result.dataValues.id,
          Fromcol_id.dataValues.id
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default { createTx, CreateTxTest };
