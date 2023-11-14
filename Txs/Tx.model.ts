import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { NFT } from "../NFTs/NFT.model";
import { Coin } from "../Coins/Coin.model";
import { Token } from "../Tokens/Token.model";
import { Block } from "../Blocks/Block.model";

export interface TxData {
  accessList: string[];
  chainId: bigint;
  from: string;
  gas: bigint;
  gasPrice: bigint;
  hash: string;
  input: string;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  r: string;
  s: string;
  to: string;
  transactionIndex: bigint;
  type: bigint;
  v: bigint;
  value: bigint;
  Method: string;
  Timestamp: bigint;
}

@Table({
  timestamps: true,
  underscored: false,
  modelName: "Tx",
  tableName: "txs",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class Tx extends Model implements TxData {
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  })
  accessList!: string[];

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  chainId!: bigint;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  from!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  gas!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  gasPrice!: bigint;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  hash!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  input!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  maxFeePerGas!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  maxPriorityFeePerGas!: bigint;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  r!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  s!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  to!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  transactionIndex!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  type!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  v!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  value!: bigint;

  @Column({
    type: DataType.TEXT,
    allowNull: true, // 테스트용으로 잠시 true로 한다
  })
  Method!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true, // 테스트용으로 잠시 true로 한다
  })
  Timestamp!: bigint;

  // foreign key 연결 구간
  @BelongsTo(() => NFT, "NFT_id")
  nft!: NFT;

  @BelongsTo(() => Coin, "coin_id")
  coin!: Coin;

  @BelongsTo(() => Token, "token_id")
  token!: Token;

  @BelongsTo(() => Block, "block_id")
  block!: Block;
}
