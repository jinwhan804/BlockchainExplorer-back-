import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Tx } from "../Txs/Tx.model";

export interface CoinData {
    symbol : string;
    total_supply : number;
}

@Table({
    timestamps : true,
    underscored : false,
    modelName : "Coin",
    tableName : 'coins',
    paranoid : false,
    charset : "utf8",
    collate : 'utf8_general_ci'
})
export class Coin extends Model implements CoinData{
    @Column({
        type : DataType.STRING(10),
        allowNull : false
    })
    symbol!: string;

    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    total_supply! : number;

    // foreign key 연결 구간
    @HasMany(()=> Tx, "coin_id")
    txs! : Tx[];
}