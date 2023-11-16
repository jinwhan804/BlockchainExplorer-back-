import BlockDTO from "./Block.dto";
import db from "../database";
// import { BlockData } from "./Block.model";
import { BlockData } from "../backbackend/function/CollectStart_websocket";
import { NextFunction } from "express";

const createBlock = async (data: BlockDTO, next : NextFunction ) => {
  try {
    await db.models.Block.create({
      number : data.number,
      hash : data.hash,
      parentHash : data.parentHash,
      sha3Uncles : data.sha3Uncles,
      logsBloom : data.logsBloom,
      transactionsRoot : data.transactionsRoot,
      stateRoot : data.stateRoot,
      receiptsRoot : data.receiptsRoot,
      miner : data.miner,
      difficulty : data.difficulty,
      extraData : data.extraData,
      gasLimit : data.gasLimit,
      gasUsed : data.gasUsed,
      timestamp : data.timestamp,
      baseFeePerGas : data.baseFeePerGas,
      withdrawalsRoot : data.withdrawalsRoot,
      nonce : data.nonce,
      mixHash : data.mixHash,
    });
  } catch (error) {
    next(error);
  }
};

const createBlocktest = async (data: BlockData) => {
  console.log("createBlocktest");
  const {
    number,
    hash,
    parentHash,
    sha3Uncles,
    logsBloom,
    transactionsRoot,
    stateRoot,
    receiptsRoot,
    miner,
    difficulty,
    extraData,
    gasLimit,
    gasUsed,
    timestamp,
    baseFeePerGas,
    withdrawalsRoot,
    nonce,
    mixHash,
  } = data;
  const value = await db.models.Block.create({
    number,
    hash,
    parentHash,
    sha3Uncles,
    logsBloom,
    transactionsRoot,
    stateRoot,
    receiptsRoot,
    miner,
    difficulty,
    extraData,
    gasLimit,
    gasUsed,
    timestamp,
    baseFeePerGas: 0,
    withdrawalsRoot: 0,
    nonce,
    mixHash,
  });
  console.log("밸류밸류밸류밸류", value);
};

const viewAllBlocks = async (next : NextFunction) => {
  try {
    const blocks = await db.models.Block.findAll({});

    return blocks;
  } catch (error) {    
    next(error);
  }
};

const viewOneBlock = async (data : BlockDTO, next : NextFunction) => {
  try {
    const block = await db.models.Block.findOne({})
  } catch (error) {
    
  }
}

export default { createBlock, createBlocktest, viewAllBlocks };
