import express from "express";
import dotenv from "dotenv";
import db from "./database";
import Web3 from "web3";
import coinRouter from "./Coins/Coin.routers";
import nftRouter from "./NFTs/NFT.routers";
import tokenRouter from "./Tokens/Token.routers";
import txRouter from "./Txs/Tx.routers";
import blockRouter from "./Blocks/Block.routers";
import EOARouter from "./EOAs/EOA.routers";
import CARouter from "./CAs/CA.routers";
import cors from "cors"; // cors 패키지 추가
import { CollectStart_http } from "./backbackend/function/CollectStart_http";
import { subscribetest } from "./backbackend/function/CollectStart_websocket";
import { getRPC_URLtest } from "./backbackend/function/config";

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

app.listen(8080, async () => {
  console.log("server open");

  if ((await getRPC_URLtest()) === "https://network.bouncecode.net/") {
    CollectStart_http();
  } else {
    subscribetest();
  }
});
