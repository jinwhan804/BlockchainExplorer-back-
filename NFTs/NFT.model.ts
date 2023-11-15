import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Tx } from "../Txs/Tx.model";

export interface NFTData {
  token_id: string;
  name: string;
  description: string;
  image_url: string;
  creator_address: string;
  Owner: string;
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
    allowNull: false,
  })
  token_id!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  image_url!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  creator_address!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  Owner!: string;

  // foreign key 연결 구간
  @HasMany(() => Tx, "NFT_id")
  txs!: Tx[];
}
