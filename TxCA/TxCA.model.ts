import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Tx } from "../Txs/Tx.model";
import { CA } from "../CAs/CA.model";

@Table({
  timestamps: false,
  modelName: "TxCA",
  tableName: "tx_ca",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class TxCA extends Model {
  @ForeignKey(() => Tx)
  @Column // 여기서 field를 사용하여 외래 키의 컬럼명을 명시
  txId!: number;

  @ForeignKey(() => CA)
  @Column // 여기서 field를 사용하여 외래 키의 컬럼명을 명시
  caId!: number;
}
