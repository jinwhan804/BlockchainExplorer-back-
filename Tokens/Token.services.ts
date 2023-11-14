import TokenDTO from "./Token.dtos";
import db from "../database";

const createToken = async (data : TokenDTO) => {
    try {
        const { contract_address, name, symbol, owner_address, decimal, circulating_supply } = data;

        await db.models.Token.create({
            contract_address,
            name,
            symbol,
            owner_address,
            decimal,
            circulating_supply
        })
    } catch (error) {
        console.log('토큰 서비스에서 토큰 데이터 추가하다 에러남');
        console.log(error);
    }
}

export default { createToken };