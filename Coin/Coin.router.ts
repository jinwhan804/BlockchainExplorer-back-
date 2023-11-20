import express from "express";
import CoinControllers from "./Coin.controller";

const router = express.Router();

router.get('/', CoinControllers.ViewAllCoins);

router.get('/:id', CoinControllers.ViewOneCoin);

export default router;
