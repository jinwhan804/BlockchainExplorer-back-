import express from "express";
import NFTControllers from "./NFT.controller";

const router = express.Router();

router.get('/', NFTControllers.ViewAllNFTs);

router.get('/:id', NFTControllers.ViewOneNFT);

router.get('/find/:tokenId', NFTControllers.FindNFT);

export default router;
