import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Tx } from "../Tx/Tx.model";

export interface NFTData {
  token_id: string;
  name: string;
  description: string;
  image_url: string;
  creator_address: string;
  Owner: string;
  transactionhash?: string;
}

@Table({
  timestamps: true,
  underscored: false,
  modelName: "NFT",
  tableName: "nfts",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class NFT extends Model implements NFTData {
  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  token_id!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image_url!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  creator_address!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  Owner!: string;

  // foreign key 연결 구간
  @HasMany(() => Tx, "NFT_id")
  txs!: Tx[];
}
