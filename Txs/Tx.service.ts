import TxDTO from "./Tx.dto";
import db from "../database";
import { TxData } from "./Tx.model";
import { NextFunction } from "express";

import { getAddresstype } from "../backbackend/function/txns/getAddresstype";
import CAServices from "../CAs/CA.service";
import EOAServices from "../EOAs/EOA.service";

const createTx = async (data: TxDTO, next : NextFunction) => {
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
    next(error);
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

const viewAllTxs = async (next : NextFunction) => {
  try {
    const blocks = await db.models.Tx.findAll({});

    return blocks;
  } catch (error) {    
    next(error);
  }
};

const viewOneTx = async (id : number, next : NextFunction) => {
  try {
    const block = await db.models.Tx.findOne({where : {id}})

    return block;
  } catch (error) {
    next(error);
  }
}

export default { createTx, CreateTxTest, viewAllTxs, viewOneTx };
