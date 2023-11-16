import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./database";
import Web3 from "web3";
import coinRouter from "./Coins/Coin.router";
import nftRouter from "./NFTs/NFT.router";
import tokenRouter from "./Tokens/Token.router";
import txRouter from "./Txs/Tx.router";
import blockRouter from "./Blocks/Block.router";
import EOARouter from "./EOAs/EOA.router";
import CARouter from "./CAs/CA.router";
import cors from "cors"; // cors 패키지 추가
import { CollectStart_http } from "./backbackend/function/CollectStart_http";
import { subscribetest } from "./backbackend/function/CollectStart_websocket";
import { getRPC_URLtest } from "./backbackend/function/config";
import { getnftinfo } from "./backbackend/function/nft/getnft_info";
import { ErrorFn } from "./database/errorExcept";

dotenv.config();

const app = express();
app.use(cors());

db.sync({ force: false })
  .then(() => {
    console.log("connect on");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/coin", coinRouter);
app.use("/nft", nftRouter);
app.use("/token", tokenRouter);
app.use("/tx", txRouter);
app.use("/block", blockRouter);
app.use("/eoa", EOARouter);
app.use("/ca", CARouter);
app.use(ErrorFn); // 예외처리 미들웨어

app.listen(8080, async () => {
  console.log("server open");
  console.log("테스트 구문 끝");
  await getnftinfo();
  if ((await getRPC_URLtest()) === "https://network.bouncecode.net/") {
    CollectStart_http();
  } else {
    subscribetest();
  }
});
