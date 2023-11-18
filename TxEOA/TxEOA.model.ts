import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Tx } from "../Txs/Tx.model";
import { EOA } from "../EOAs/EOA.model";

@Table({
  timestamps: false,
  modelName: "TxEOA",
  tableName: "tx_eoa",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class TxEOA extends Model {
  @ForeignKey(() => Tx)
  @Column
  txId!: number;

  @ForeignKey(() => EOA)
  @Column
  eoaId!: number;
}
