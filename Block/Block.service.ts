import BlockDTO from "./Block.dtos";
import db from "../database";
// import { BlockData } from "./Block.model";
import { BlockData } from "../information-system/function/CollectStart_websocket";

const createBlock = async (data: BlockDTO) => {
  try {
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

    await db.models.Block.create({
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
    });
  } catch (error) {
    console.log("블록 서비스에서 블록 데이터 추가하다 에러남");
    console.log(error);
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
  return value;
};
export default { createBlock, createBlocktest };
