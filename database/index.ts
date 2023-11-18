import { Sequelize } from "sequelize-typescript";
import config from "./config";
import { Coin } from "../Coins/Coin.model";
import { NFT } from "../NFTs/NFT.model";
import { Token } from "../Tokens/Token.model";
import { Tx } from "../Txs/Tx.model";
import { EOA } from "../EOAs/EOA.model";
import { Block } from "../Blocks/Block.model";
import { CA } from "../CAs/CA.model";
import { TxCA } from "../TxCA/TxCA.model";
import { TxEOA } from "../TxEOA/TxEOA.model";

const db = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  {
    host: config.dev.host,
    dialect: "postgres",
    models: [Tx, Coin, NFT, Token, EOA, CA, Block, TxCA, TxEOA],
  }
);

export default db;
