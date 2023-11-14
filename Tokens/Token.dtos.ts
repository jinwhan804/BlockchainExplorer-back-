import { BaseDTO } from "../database/baseDTO";
import { TokenData } from "./Token.model";

export default class TokenDTO extends BaseDTO implements TokenData {
    public contract_address: string;
    public name: string;
    public symbol: string;
    public owner_address: string;
    public decimal: number;
    public circulating_supply: number;

    constructor(body : TokenData){
        super();
        this.contract_address = body.contract_address;
        this.name = body.name;
        this.symbol = body.symbol;
        this.owner_address = body.owner_address;
        this.decimal = body.decimal;
        this.circulating_supply = body.circulating_supply;
        this.createDTO(this);
    }
}