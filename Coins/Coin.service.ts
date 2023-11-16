import CoinDTO from "./Coin.dto";
import db from "../database";

const createCoin = async (data : CoinDTO) => {
    try {
        const { symbol, total_supply } = data;

        await db.models.Coin.create({
            symbol,
            total_supply
        })
    } catch (error) {
        console.log('코인 서비스에서 코인 데이터 추가하다 에러남');
        console.log(error);
    }
}

export default { createCoin };