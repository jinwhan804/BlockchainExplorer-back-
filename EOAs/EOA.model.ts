import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Tx } from "../Txs/Tx.model";

export interface EOAData {
    address : string;
    token : bigint;
    ethBalance : bigint;
}

@Table({
    timestamps : true,
    underscored : false,
    modelName : "EOA",
    tableName : 'eoas',
    paranoid : false,
    charset : "utf8",
    collate : 'utf8_general_ci'
})
export class EOA extends Model implements EOAData{
    @Column({
        type : DataType.STRING(150),
        allowNull : false
    })
    address!: string;

    @Column({
        type : DataType.BIGINT,
        allowNull : false
    })
    token! : bigint;

    @Column({
        type : DataType.BIGINT,
        allowNull : false
    })
    ethBalance! : bigint;

    // foreign key 연결 구간
    @HasMany(()=> Tx, "eoa_id")
    txs! : Tx[];
}