import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { TxCA } from "../TxCA/TxCA.model";
import { Tx } from "../Tx/Tx.model";

export interface CAData {
  address: string;
  CAtype: string;
  abiSigniture: string[];
  signitureNames: string[];
  abi?: Record<string, any>; // 여기서 abi는 JSON 데이터의 구체적인 형태에 따라 조정할 수 있습니다.
}

@Table({
  timestamps: true,
  underscored: false,
  modelName: "CA",
  tableName: "CAs",
  paranoid: false,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export class CA extends Model implements CAData {
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  address!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  CAtype!: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  })
  abiSigniture!: string[];

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  })
  signitureNames!: string[];

  @Column({
    type: DataType.JSONB, // JSON 데이터를 저장하기 위해 JSONB 타입 사용
    allowNull: true,
  })
  abi!: Record<string, any>;

  // foreign key 연결 구간
  @HasMany(() => Tx, "CA_id")
  transactions!: Tx[];
  @BelongsToMany(() => Tx, () => TxCA, "caId", "txId")
  transactionAssociations!: Tx[];
}
