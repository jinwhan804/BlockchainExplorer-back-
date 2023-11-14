import { Sequelize } from "sequelize-typescript";
import config from "./config";
import { Coin } from "../Coins/Coin.model";
import { NFT } from "../NFTs/NFT.model";
import { Token } from "../Tokens/Token.model";
import { Tx } from "../Txs/Tx.model";
import { EOA } from "../EOAs/EOA.model";
import { Block } from "../Blocks/Block.model";
import { CA } from "../CAs/CA.model";

const db = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  {
    host: config.dev.host,
    dialect: "postgres",
    models: [Coin, NFT, Token, Tx, EOA, CA, Block],
  }
);

export default db;
