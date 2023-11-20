import CoinDTO from "./Coin.dtos";
import CoinServices from "./Coin.services";
import { Request, Response } from "express";

const CreateCoin = async (req : Request, res : Response) => {
    try {
        const reqDTO = new CoinDTO(req.body);

        await CoinServices.createCoin(reqDTO);

        res.send();
    } catch (error) {
        console.log('코인 데이터 컨트롤러에서 코인 데이터 추가하다가 에러남');
        console.log(error);
    }
}

export default { CreateCoin };