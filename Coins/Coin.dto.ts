import { BaseDTO } from "../database/baseDTO";
import { CoinData } from "./Coin.model";

export default class CoinDTO extends BaseDTO implements CoinData {
    public symbol: string;
    public total_supply: number;

    constructor(body : CoinData){
        super();
        this.symbol = body.symbol;
        this.total_supply = body.total_supply;
        this.createDTO(this);
    }
}