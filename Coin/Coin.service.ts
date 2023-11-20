import CoinDTO from "./Coin.dto";
import db from "../database";
import { NextFunction } from "express";

const createCoin = async (data : CoinDTO, next : NextFunction) => {
    try {
        const { symbol, total_supply } = data;

        await db.models.Coin.create({
            symbol,
            total_supply
        })
    } catch (error) {
        next(error);
    }
}

const viewAllCoins = async (next : NextFunction) => {
    try {
        const coins = await db.models.Coin.findAll({});

        return coins;
    } catch (error) {
        next(error);
    }
}

const viewOneCoin = async (id : number, next : NextFunction) => {
    try {
        const coin = await db.models.Coin.findOne({where : {id}});

        return coin;
    } catch (error) {
        next(error);
    }
}

export default { createCoin, viewAllCoins, viewOneCoin };