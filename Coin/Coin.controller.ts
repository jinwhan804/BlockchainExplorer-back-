import CoinDTO from "./Coin.dto";
import CoinServices from "./Coin.service";
import { NextFunction, Request, Response } from "express";

const CreateCoin = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const reqDTO = new CoinDTO(req.body);

        await CoinServices.createCoin(reqDTO, next);

        res.send();
    } catch (error) {
        next(error);
    }
}

const ViewAllCoins = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const data = await CoinServices.viewAllCoins(next);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

const ViewOneCoin = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const id = Number(req.params);
        const data = await CoinServices.viewOneCoin(id, next);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

export default { CreateCoin, ViewAllCoins, ViewOneCoin };