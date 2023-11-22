import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Tx } from "../Tx/Tx.model";
import { TxEOA } from "../TxEOA/TxEOA.model";

export interface EOAData {
  address: string;
  token: bigint;
  ethBalance: bigint;
}

@Table({
  timestamps: true,
  underscored: false,
  modelName: "EOA",
  tableName: "eoas",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class EOA extends Model implements EOAData {
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  token!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  ethBalance!: bigint;

  // foreign key 연결 구간
  // N:M 관계 설정
  @BelongsToMany(() => Tx, () => TxEOA)
  transactionAssociations!: Tx[];

  @BelongsToMany(() => Tx, () => TxEOA)
  txs!: Tx[];
}
