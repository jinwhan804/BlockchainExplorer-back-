import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Tx } from "../Tx/Tx.model";

export interface TokenData {
  contract_address: string;
  name: string;
  symbol: string;
  owner_address: string;
  decimal: number;
  circulating_supply: number;
}

@Table({
  timestamps: true,
  underscored: false,
  modelName: "Token",
  tableName: "tokens",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class Token extends Model implements TokenData {
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  contract_address!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  symbol!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  owner_address!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  decimal!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  circulating_supply!: number;

  // foreign key 연결 구간
  @HasMany(() => Tx, "token_id")
  txs!: Tx[];
}
